import { MATCHING_MEISTER_STATUS, RESERVATION_STATUS } from '~/config/consts'

export class ConsultationHelpers {
  static canMakeReservation (user, planDetail) {
    let flag = true
    const checkFields = ['name', 'kana_name', 'mobile']
    checkFields.forEach((field) => {
      const value = user[field]
      const parseValue = parseInt(value)
      if (
        (Number.isInteger(parseValue) && parseValue < 0) ||
        (Number.isNaN(parseValue) && (!value || !value.length))
      ) {
        flag = false
      }
    })
    if (
      [RESERVATION_STATUS.PROCESSING].includes(planDetail.status)
    ) {
      flag = false
    }
    return flag
  }

  static isPublicPlan (matching) {
    return ![
      RESERVATION_STATUS.ESTIMATING,
      MATCHING_MEISTER_STATUS.REQUESTED
    ].includes(matching.status) &&
      (
        matching.itinerary &&
        ![
          RESERVATION_STATUS.ESTIMATING,
          MATCHING_MEISTER_STATUS.REQUESTED
        ].includes(matching.itinerary.status)
      )
  }
}
