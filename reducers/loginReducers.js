import { 
    LOGIN_INITIALIZE, 
    LOGIN_SUCCESS, 
    LOGIN_REQUEST, 
    LOGIN_FAILURE, 
    LOGOUT
   } from '../types/login.type';
  
  const initialState = {
    message: null,
    error_status: false,
    user: {}
  }
  
  export default function (state = initialState, action) {
    switch (action.type) {
  
      case LOGIN_INITIALIZE:
        return {
          ...state,
          message: null,
          error_status: false
        }
      case LOGIN_REQUEST:
        return {
          ...state,
          message: null,
          error_status: false
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.user,
          message: null,
          error_status: false
        }
      case LOGIN_FAILURE:
        return {
          ...state,
          error_status: true,
          message: action.message,
        }
      case LOGOUT:
        return {
          ...state,
          error_status: false,
          user: action.user
        }
      default:
        return state;
    }
  }