import { computed } from '@vue/composition-api'
import { TRANSPORTION_KEY } from '~/constants/resources'

export function useScheduleHelper (itinerary) {
  const consultation = computed(() => itinerary?.consultation)
  return {
    // computed
    consultation,

    // methods
    transportationType
  }
}

function transportationType (type) {
  switch (String(type)) {
    case TRANSPORTION_KEY.AIRPLANE:
      return 'airplane'
    case TRANSPORTION_KEY.BULLET_TRAIN:
      return 'express'
    case TRANSPORTION_KEY.ELECTRIC_TRAIN:
      return 'train'
    case TRANSPORTION_KEY.TAXI:
      return 'taxi'
    case TRANSPORTION_KEY.BUS:
      return 'bus'
    case TRANSPORTION_KEY.FOOT:
      return 'walk'
    case TRANSPORTION_KEY.CAR_RENTAL:
      return 'car-rental'
    case TRANSPORTION_KEY.FERRY:
      return 'boat'
    default:
      return null
  }
}
