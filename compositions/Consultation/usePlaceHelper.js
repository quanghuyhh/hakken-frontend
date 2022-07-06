import { findLast, isEmpty } from 'lodash'
import {
  LOCATION_LEVEL_CITY,
  LOCATION_LEVEL_COUNTRY,
  LOCATION_LEVEL_LOCALITY,
  LOCATION_TYPE_CITY,
  LOCATION_TYPE_COUNTRY,
  LOCATION_TYPE_LOCALITY,
  LOCATION_TYPE_LOCALITY_LV2
} from '~/constants/location'

export function usePlaceHelper () {
  const getPlaceDataByType = _getPlaceDataByType
  const getPlaceData = _getPlaceData
  const transformFromDB = _transformPlaceFromDB

  return {
    getPlaceDataByType,
    getPlaceData,
    transformFromDB
  }
}

function _getPlaceData (place, showExtra = true) {
  if (isEmpty(place)) {
    return null
  }

  // eslint-disable-next-line camelcase
  const { name, place_id, formatted_address, ...extras } = place
  const result = {
    name,
    place_id,
    formatted_address,
    country: _getPlaceDataByType(LOCATION_LEVEL_COUNTRY, place),
    city: _getPlaceDataByType(LOCATION_LEVEL_CITY, place),
    locality: _getPlaceDataByType(LOCATION_LEVEL_LOCALITY, place)
  }
  if (showExtra) {
    result.extra_data = JSON.stringify(extras)
  }

  return result
}

function _transformPlaceFromDB (place) {
  if (isEmpty(place)) {
    return null
  }

  // eslint-disable-next-line camelcase
  const { extra_data, ...others } = place
  return {
    ...others,
    extra_data: JSON.stringify(extra_data)
  }
}

function _getPlaceDataByType (type, place) {
  const addessComponent = place?.address_components || []
  switch (type) {
    case LOCATION_LEVEL_COUNTRY:
      return findLast(addessComponent, item => item.types.includes(LOCATION_TYPE_COUNTRY))?.long_name
    case LOCATION_LEVEL_CITY:
      return findLast(addessComponent, item => item.types.includes(LOCATION_TYPE_CITY))?.long_name
    case LOCATION_LEVEL_LOCALITY:
      return findLast(
        addessComponent,
        item => item.types.includes(LOCATION_TYPE_LOCALITY) || item.types.includes(LOCATION_TYPE_LOCALITY_LV2)
      )?.long_name
    default:
      return ''
  }
}
