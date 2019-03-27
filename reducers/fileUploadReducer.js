import {
  GET_SIGNED_URL_FAILURE,
  GET_SIGNED_URL_REQUEST,
  GET_SIGNED_URL_SUCCESS,
}
  from '../types/fileupload.types'

const initialState = {
  data: [],
  error: {},
  fetching: false,
  photFor: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SIGNED_URL_REQUEST:
      return {
        ...state,
        fetching: action.fetching
      }
    case GET_SIGNED_URL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: action.fetching,
        photFor: action.photFor
      }
    case GET_SIGNED_URL_FAILURE:
      return {
        ...state,
        error: action.payload,
        fetching: action.fetching,
        photFor: action.photFor
      }
    default:
      return state;
  }
}