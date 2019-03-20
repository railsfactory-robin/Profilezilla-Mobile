import {
    LOGIN_INITIALIZE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT
  } from '../types/login.type';
  import Api from './api';
  import { AsyncStorage } from 'react-native';

  export const loginSuccess = (user) => {
    return {
      type: LOGIN_SUCCESS,
      user
    }
  }
  
  export const loginFailure = (error) => {
    return {
      type: LOGIN_FAILURE,
      message: error
    }
  }
  
  export const loginRequest = (isLoading) => {
    return {
      type: LOGIN_REQUEST,
      isLoading
    }
  }
  
  export const logout = (user) => {
    return {
      type: LOGOUT,
      user
    }
  }
  
  export const userLogout = () => {
    return dispatch => {
      dispatch(logout({}));
    }
  }
  
  export const UserLogin = (userData) => {
  
    return dispatch => {
      dispatch(loginRequest(true));
      Api.post('/api/v1/sessions/login', userData)
        .then(response => response.json())
        .then(response => {
          if (response.status === 200) {
            AsyncStorage.setItem('token', response.auth_token)
            AsyncStorage.setItem('user', JSON.stringify(response))
            dispatch(loginSuccess(response));
          } else {
            dispatch(loginFailure(response.error[0]));
          }
        })
        .catch((error) => {
          dispatch(loginFailure("Something Went Wrong"));
        });
    }
  }
  
  
  export const initialize = () => {
    return {
      type: LOGIN_INITIALIZE
    }
  }
  
  export const initializeForm = () => {
    return dispatch => {
      dispatch(initialize())
    }
  }
  
  