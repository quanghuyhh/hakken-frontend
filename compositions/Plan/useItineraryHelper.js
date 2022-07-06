export function useItineraryHelper () {
  return {
    // methods
    getItinerary
  }
}

async function getItinerary (itineraryHashId, repositories) {
  return await repositories.schedule.getSchedulePreview(itineraryHashId)
    .then(({ results }) => results)
    .catch(() => {})
}
