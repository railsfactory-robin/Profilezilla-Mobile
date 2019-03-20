import React, { Component } from 'react';
import {AsyncStorage } from 'react-native';
let tok = null;

export default class Api extends Component {

  static returnApiUrl(env) {
      return 'http://profilezilla-api.railsfactory.com/'
  }

  static _checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      return token;
    }
    return false;
  };

  static tokenfun(token){
    tok = token
  }

  static setAuthorizationToken() {
    const header = new Headers({
      'content-type': 'application/json'
    });
    header.append('Authorization', tok);
    return header;
  }

  static get(url) {
    return this.apiCall(url, null, 'GET');
  }

  static put(url, params) {
    return this.apiCall(url, params, 'PUT');
  }

  static post(url, params) {
    return this.apiCall(url, params, 'POST');
  }

  static delete(url, params) {
    return this.apiCall(url, params, 'DELETE');
  }

  static s3FileUpload(url, file) {
    return fetch(url, {
      method: 'PUT',
      body: file
    });
  }

  static apiCall(url, params, method) {
    const host = this.returnApiUrl(process.env.NODE_ENV);
    const fullUrl = `${host}${url}`;
    return fetch(fullUrl, {
      method: method,
      headers: this.setAuthorizationToken(),
      body: params ? JSON.stringify(params) : null
    });
  }
}

