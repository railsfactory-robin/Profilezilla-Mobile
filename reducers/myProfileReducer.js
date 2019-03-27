import {
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_WARNING

} from '../types/myprofile.types';

const initialState = {
  message: null,
  error_status: false,
  success_status: false,
  warning_message: false
}

export default function (state = initialState, action) {
  switch (action.type) {

    case PROFILE_REQUEST:
      return {
        ...state,
        message: null,
        error_status: false,
        success_status: false,
        warning_message: false
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        message: action.message,
        error_status: false,
        success_status: true,
        warning_message: false
      }
    case PROFILE_FAILURE:
      return {
        ...state,
        message: action.message,
        error_status: true,
        success_status: false,
        warning_message: false
      }
    case PROFILE_WARNING:
      return {
        ...state,
        message: action.message,
        error_status: false,
        success_status: false,
        warning_message: true
      }
    default:
      return state;
  }
}