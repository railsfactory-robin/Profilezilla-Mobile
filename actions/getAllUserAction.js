import {
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE
  
  } from '../types/myprofile.types';
  import Api from './api';
  
  
  export const getAllUserRequest = () => {
    return {
      type: GET_ALL_USER_REQUEST
    }
  }
  
  export const getAllUserSuccess = (response) => {
    return {
      type: GET_ALL_USER_SUCCESS,
      total_count: response.count,
      user_list: response.data
    }
  }
  
  export const getAllUserFailure = (error) => {
    return {
      type: GET_ALL_USER_FAILURE
    }
  }
  
  export const getAllUserDetails = (data) => {
    return dispatch => {
      dispatch(getAllUserRequest(true));
      Api.get('/api/v1/users?offset='+data.offset+'&limit='+data.limit)
        .then(response => response.json())
        .then(response => {
          if (response.status === 200) {
            dispatch(getAllUserSuccess(response));
          } else {  
            dispatch(getAllUserFailure(response.error[0]));
          }
        })
        .catch((error) => {
          dispatch(getAllUserFailure(error));
        });
    }
  }