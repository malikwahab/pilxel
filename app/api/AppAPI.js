import 'whatwg-fetch';

window.fbAsyncInit = function () {
  FB.init({
    appId: 1115277871867265,
    xfbml: true,
    version: 'v2.4'
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


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
      .then(parseJSON);
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
      .then(parseJSON);
  },
  verifyToken(token) {
    const config = {
      method: "post",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    }
    return fetch('/api/v1/auth/token-verify/', config).then(checkStatus);
  },
  refreshToken(token) {
    const config = {
      method: "post",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    }
    return fetch('/api/v1/auth/token-refresh/', config)
      .then(checkStatus)
      .then(parseJSON);
  }
};

export const ImageAPI = {

  getImageDetails(id) {
    let config = {
      method: 'get',
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };
    return fetch(`/api/v1/image-details/${id}/`, config)
      .then(checkStatus)
      .then(parseJSON);
  },
  editImage(id, editObject) {
    let config = {
      method: "put",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editObject)
    };
    return fetch(`/api/v1/images/${id}/`, config)
      .then(checkStatus)
      .then(responseToBlob)
      .then(loadObjectURL);
  },
  uploadImage(name, file, folder) {
    var data = new FormData();
    data.append('image', file);
    data.append('name', name);
    if (folder) {
      data.append('folder', folder);
    }
    let config = {
      method: "post",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token')
      },
      body: data
    };
    return fetch('/api/v1/images/', config)
      .then(checkStatus)
      .then(parseJSON);
  },
  fetchImages() {
    let config = {
      method: "get",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };
    return fetch('/api/v1/images/', config).then(checkStatus).then(parseJSON);
  },
  fetchFolders() {
    let config = {
      method: "get",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };
    return fetch('/api/v1/folders/', config).then(checkStatus).then(parseJSON);
  },
  addFolder(name) {
    let config = {
      method: "post",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    };
    return fetch('/api/v1/folders/', config).then(checkStatus).then(parseJSON);
  },
  deleteImage(id) {
    let config = {
      method: "delete",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };
    return fetch(`/api/v1/images/${id}/`, config).then(checkStatus);
  },
  updateFolder(id, name) {
    let config = {
      method: "put",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    };
    return fetch(`/api/v1/folders/${id}/`, config).then(checkStatus).then(
      parseJSON);
  },
  deleteFolder(id) {
    let config = {
      method: "delete",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };
    return fetch(`/api/v1/folders/${id}/`, config).then(checkStatus);
  },
  updateImage(id, updateObject) {
    let config = {
      method: "put",
      headers: {
        "Authorization": "JWT " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateObject)
    };
    return fetch(`/api/v1/image-details/${id}/`, config).then(checkStatus)
      .then(parseJSON);
  }
}

export let facebookAPI = {
  shareImage(id) {
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': "http://buppli.herokuapp.com",
          'og:image': `/api/v1/images/${id}`
        }
      })
    });
  },
  facebookLogin() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve(response.authResponse)
        } else {
          FB.login((response) => {
            response.status === 'connected' ? resolve(response.authResponse) :
              reject(response);
          });
        }
      });
    })
  },
  facebookLogout() {
    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        response.authResponse ? resolve(response) : reject(response);
      });
    });
  },
  facebookLoginAccessToken(response) {
    let config = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: response.accessToken,
        code: response.userID
      })
    };
    return fetch('/api/v1/auth/facebook/', config).then(checkStatus).then(
      parseJSON);
  },
}

export default AuthenticateAPI;
