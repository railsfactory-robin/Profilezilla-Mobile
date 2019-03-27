import {
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_WARNING

} from '../types/myprofile.types';
import Api from './api';

export const profileSuccess = (res) => {
  return {
    type: PROFILE_SUCCESS,
    message: res.message || "Profile Saved Successfully"
  }
}

export const profileFailure = (error) => {
  return {
    type: PROFILE_FAILURE,
    message: "Something went Wrong!"
  }
}

export const profileRequest = () => {
  return {
    type: PROFILE_REQUEST
  }
}

export const profileWarning = (res) => {
  return {
    type: PROFILE_WARNING,
    message: res.message
  }
}

export const CreateUserProfile = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/basic_information', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateEducationDetails = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/education', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateExperienceDetails = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/experience', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateSkillSets = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/skill_set', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateProjects = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/project', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateAdditionalInfo = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/information', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateFamilyHistory = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/family_history', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateAttachments = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/documents', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const CreateEmergencyContact = (userData) => {
  return dispatch => {
    dispatch(profileRequest(true));
    Api.post('/api/v1/profile/emergency_contact', userData)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(profileSuccess(response));
        } else if (response.status === 404) {
          dispatch(profileWarning(response));
        } else {
          dispatch(profileFailure(response.error[0]));
        }
      })
      .catch((error) => {
        dispatch(profileFailure(error));
      });
  }
}

export const initialize = () => {
  return dispatch => {
    dispatch(profileRequest())
  }
}