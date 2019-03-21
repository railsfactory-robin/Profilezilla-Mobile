import {
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE
  
  } from '../types/myprofile.types';
  
  
  const initialState = {
    user_list: [],
    total_count: 0
  }
  
  export default function (state = initialState, action) {
    switch (action.type) {
  
      case GET_ALL_USER_REQUEST:
        return {
          ...state
        }
      case GET_ALL_USER_SUCCESS:
        return {
          ...state,
          user_list: action.user_list,
          total_count: action.total_count
        }
      case GET_ALL_USER_FAILURE:
        return {
          ...state
        }
      default:
        return state;
    }
  }