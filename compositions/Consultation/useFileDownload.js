import { computed } from '@vue/composition-api'
import { findLast } from 'lodash'
import {
  DOCUMENT_TYPE_ITINERARY_BOOKING_ACCEPTANCE,
  DOCUMENT_TYPE_ITINERARY_ESTIMATE,
  DOCUMENT_TYPE_ITINERARY_INVOICE,
  DOCUMENT_TYPE_ITINERARY_OTHER,
  DOCUMENT_TYPE_ITINERARY_RECEIPT,
  DOCUMENT_TYPE_ITINERARY_SCHEDULE
} from '~/constants/document'

export function useFileDownload (itinerary) {
  // computed
  const documents = computed(() => itinerary?.documents || [])
  const documentList = computed(() => _getDocumentTypes(itinerary, documents.value))

  return {
    documents,
    documentList
  }
}

function _getDocumentTypes (itinerary, documents) {
  const results = {
    schedule: _getScheduleFile(itinerary)
  }
  let activeDocuments = documents.filter(document => document?.is_active === true)
  if (!Object.keys(activeDocuments).length) {
    return results
  }

  activeDocuments = activeDocuments.map((document) => {
    document.label = [document.title, document.code].join(' - ')
    return document
  })

  return {
    estimate: findLast(activeDocuments, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_ESTIMATE),
    reservation: findLast(activeDocuments, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_BOOKING_ACCEPTANCE),
    invoice: findLast(activeDocuments, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_INVOICE),
    receipt: findLast(activeDocuments, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_RECEIPT),
    other: findLast(activeDocuments, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_OTHER)
  }
}

function _getScheduleFile (itinerary) {
  if (parseInt(itinerary?.is_public || 0) <= 0) {
    return null
  }
  return findLast(itinerary?.documents, document => document?.category?.code === DOCUMENT_TYPE_ITINERARY_SCHEDULE) || {}
}
