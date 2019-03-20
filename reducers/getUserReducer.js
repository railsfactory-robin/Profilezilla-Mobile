import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE

} from '../types/myprofile.types';


const initialState = {
  profile: {}
}

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_USER_REQUEST:
      return {
        ...state,
        profile:{}
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        profile: action.profile
      }
    case GET_USER_FAILURE:
      return {
        ...state
      }
    default:
      return state;
  }
}