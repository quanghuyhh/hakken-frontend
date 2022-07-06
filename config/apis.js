export const USER = '/users'
export const AUTH = '/auth'
export const PROFILE = '/auth/profile'
export const TRAVELLERS_URL = '/travelers'
export const CONSULTATIONS = `${TRAVELLERS_URL}/consultations`
export const DESTINATIONS = `${TRAVELLERS_URL}/destinations`
export const PURPOSES = `${TRAVELLERS_URL}/purposes`
export const FAVORITES = `${TRAVELLERS_URL}/favorites`
export const POINT_OF_DEPATURES = `${TRAVELLERS_URL}/point-of-departures`
export const MATCHING_CONSULTATION_MEISTER = `${TRAVELLERS_URL}/matching`
export const PLANS = `${TRAVELLERS_URL}/plans`
export const ITINERARIES = `${TRAVELLERS_URL}/itineraries`

export const HTTP_CODE = {
  HTTP_SUCCESS: 200,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_CONFLICT: 409,
  HTTP_UNPROCESSABLE_ENTITY: 422,
  HTTP_TOO_MANY_REQUESTS: 429,
  HTTP_INTERNAL_SERVER_ERROR: 500
}

export const HTTP_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
