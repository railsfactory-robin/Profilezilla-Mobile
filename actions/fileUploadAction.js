import {
    GET_SIGNED_URL_FAILURE,
    GET_SIGNED_URL_REQUEST,
    GET_SIGNED_URL_SUCCESS,
  }
    from '../types/fileupload.types'
  import Api from './api';
  
  export const getSignedUrlRequest = () => {
    return {
      type: GET_SIGNED_URL_REQUEST,
      fetching: true
    }
  }
  
  export const getSignedUrlSuccess = (data, photFor) => {
    return {
      type: GET_SIGNED_URL_SUCCESS,
      fetching: false,
      payload: data,
      photFor: photFor
    }
  }
  
  export const getSignedUrlFailure = (error, photFor) => {
    return {
      type: GET_SIGNED_URL_FAILURE,
      payload: error,
      fetching: false,
      photFor: photFor
    }
  }
  
  function postSignedUrl(data, file) {
    let url = data.urls[0].signedUrl;
    return Api.s3FileUpload(url, file);
  }
  
  
  export const fileUploader = (accepted_files, photFor) => {
    let file = { name: accepted_files.name, type: accepted_files.type }
    return dispatch => {
      dispatch(getSignedUrlRequest());
      Api.post('/api/v1/s3/sign', { files: file })
        .then((response) => response.json())
        .then(data => {
          postSignedUrl(data, accepted_files)
            .then(res => {
              data.message = "Successfuly uploaded";
              dispatch(getSignedUrlSuccess(data, photFor))
            })
            .catch(error => {
              dispatch(getSignedUrlFailure(error, photFor))
            });
        })
        .catch((err) => {
          dispatch(getSignedUrlFailure(err, photFor))
        })
    }
  }