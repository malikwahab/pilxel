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
    return fetch('http://localhost:8888/api/v1/auth/login/', config)
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

export default AuthenticateAPI;
