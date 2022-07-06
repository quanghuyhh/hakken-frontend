export const AUTH_EXCEPTION_CODE = {
  notAuthorizedException: 'NotAuthorizedException',
  expiredCodeException: 'ExpiredCodeException',
  invalidPasswordException: 'InvalidPasswordException',
  userNotFoundException: 'UserNotFoundException'
}

export const COGNITO_MESSAGE_ERROR = {
  LINK_REGISTER_EXPIRED: 'Temporary password has expired and must be reset by an administrator.',
  LINK_REGISTER_NOT_CORRECT: 'Incorrect username or password.'
}

export const ONLINE_MEETING_STATUS = {
  REQUESTED: 'requested',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted'
}

export const TOAST_CONFIG = {
  goAwayTime: 1500
}

export const CONSULTATION_STATUS = {
  NEW: 'new',
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const MATCHING_STATUS = {
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
}

export const RESERVATION_STATUS = {
  ESTIMATING: 'estimating',
  ESTIMATED: 'estimated',
  REJECTED: 'rejected',
  PROCESSING: 'processing',
  CANCELING: 'canceling',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  CHANGE_REQUESTED: 'change_requested',
  CHANGE_PROCESSING: 'change_processing',
  CHANGE_COMPLETED: 'change_completed'
}

export const MATCHING_MEISTER_STATUS = {
  REQUESTED: 'requested',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
}

export const CONSULTATION_LIMIT = {
  ITINERARY: 5,
  WAITING_HOURS: 48
}

export const CONSULTATION_TAB = {
  CACHE_KEY: 'consultation_tab'
}

export const MATCHING_MEISTER = {
  CACHE_REDIRECT: 'redirect_after_auth',
  CACHE_FILTER_DATA: 'cache_filter_data'
}

export const CONSULTATION_GROUP_STATUS = {
  REQUESTED: [CONSULTATION_STATUS.REQUESTED, CONSULTATION_STATUS.NEW],
  RESERVED: [CONSULTATION_STATUS.ACCEPTED],
  COMPLETED: [CONSULTATION_STATUS.REJECTED, CONSULTATION_STATUS.CANCELLED, CONSULTATION_STATUS.COMPLETED]
}
