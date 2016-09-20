import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  AUTHENTICATE_REQUEST,
  LOGOUT,
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA_FAILURE,
  AUTH_VERIFICATION_FAILURE
} from '../constants';
import AuthenticateAPI, { facebookAPI } from '../api/AppAPI';
import jwtDecode from 'jwt-decode';

const AuthenticationActionCreator = {

  login(credentials) {
    return (dispatch) => {
      dispatch({ type: AUTHENTICATE_REQUEST });
      AuthenticateAPI.loginUser(credentials).then(
        (response) => {
          localStorage.setItem('token', response.token);
          dispatch(this.loadUserData(response.token));
        },
        (error) => {
            dispatch({ type: AUTHENTICATE_FAILURE, error: "LOGIN" })
        }
      )
    }
  },
  signUp(credentials) {
    return (dispatch) => {
      dispatch({ type: AUTHENTICATE_REQUEST });
      AuthenticateAPI.signUpUser(credentials).then(
        (response) => {
          login(credentials);
        },
        (error) => dispatch({ type: AUTHENTICATE_FAILURE, error: "SIGNUP" })
      )
    }
  },
  logout() {
    localStorage.removeItem('token');
    return {
      type: LOGOUT
    }
  },
  loginWithFacebook() {
    return (dispatch) => {
      dispatch({ type: AUTHENTICATE_REQUEST });
      facebookAPI.facebookLogin().then(
        (response) => {
          facebookAPI.facebookLoginAccessToken(response).then(
            (response) => {
              localStorage.setItem('token', response.token);
              dispatch(this.loadUserData(response.token));
            },
            (error) => dispatch({ type: AUTHENTICATE_FAILURE, error: "FACEBOOK_LOGIN" })
          );
        },
        (error) => dispatch({ type: AUTHENTICATE_FAILURE, error: "FACEBOOK_LOGIN" })
      );
    };
  },
  loadUserData(token) {
    return (dispatch) => {
      if (token) {
        const userData = jwtDecode(token);
        dispatch({ type: LOAD_USERDATA_SUCCESS, userData: userData });
      } else {
        dispatch({ type: LOAD_USERDATA_FAILURE });
      }
    };
  },
  checkLoginStatus() {
    return (dispatch) => {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(this.verifyToken(token));
      } else {
        dispatch({ type: AUTH_VERIFICATION_FAILURE });
      }
    };
  },
  verifyToken(token) {
    return (dispatch) => {
      AuthenticateAPI.verifyToken(token).then(
        (response) => {
          dispatch(this.loadUserData(token));
        },
        (error) => {
          dispatch({ type: AUTH_VERIFICATION_FAILURE });
        }
      );
    }
  }
};

export default AuthenticationActionCreator;
