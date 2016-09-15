import 'whatwg-fetch';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

const parseJSON = (response) => {
  return response.json();
}

const responseToBlob = (response) => {
  return response.blob();
}

const loadObjectURL = (response) => {
  return URL.createObjectURL(response);
}

let authHeader = {
  "Authorization": "JWT " + localStorage.getItem('token'),
  'Content-Type': 'application/json'
}

let AuthenticateAPI = {
  loginUser(credentials) {
    let config = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
    return fetch('/api/v1/auth/login/', config)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => localStorage.setItem('token', data.token));
  },

  signUpUser(credentials) {
    let config = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
    return fetch('/api/v1/auth/register/', config)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => localStorage.setItem('token', data.token));
  },
};

export const ImageAPI = {
  getImageDetails(id) {
    let config = {
      method: 'get',
      headers: authHeader
    };
    return fetch(`/api/v1/image-details/${id}/`, config)
      .then(checkStatus)
      .then(parseJSON);
  },
  editImage(id, editObject) {
    let config = {
      method: "put",
      headers: authHeader,
      body: JSON.stringify(editObject)
    };
    return fetch(`/api/v1/images/${id}/`, config)
      .then(checkStatus)
      .then(responseToBlob)
      .then(loadObjectURL)
  },
}
export default AuthenticateAPI;
