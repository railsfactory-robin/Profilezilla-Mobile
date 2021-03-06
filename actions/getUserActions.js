import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE

} from '../types/myprofile.types';
import Api from './api';
import { AsyncStorage } from 'react-native';

export const getUserRequest = () => {
  return {
    type: GET_USER_REQUEST
  }
}

export const getUserSuccess = (profile) => {
  return {
    type: GET_USER_SUCCESS,
    profile : profile.profile
  }
}

export const getUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    message: error
  }
}

export const getUserDetails = (id) => {
  let url = '/api/v1/profile';
  if (id) {
    url = '/api/v1/profile?employee_id='+id;
  }
  return dispatch => {
    dispatch(getUserRequest(true));
    Api.get(url)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(getUserSuccess(response));
        } else {
          if(response.message === 'Session expired. Please login again'){
            AsyncStorage.clear();
          }
          dispatch(getUserFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(getUserFailure(error));
      });
  }
}