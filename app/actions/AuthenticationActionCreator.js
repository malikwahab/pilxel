import { AUTHENTICATE_SUCCESS,AUTHENTICATE_FAILURE, AUTHENTICATE_REQUEST, LOGOUT } from '../constants';
import AuthenticateAPI from '../api/AppAPI';

const AuthenticationActionCreator = {

  login(credentials) {
      return (dispatch) => {
          dispatch({ type: AUTHENTICATE_REQUEST });
          AuthenticateAPI.loginUser(credentials).then(
              (response) => {
                  localStorage.setItem('token', response.token);
                  dispatch({ type: AUTHENTICATE_SUCCESS })
              },
              (error) => dispatch({ type: AUTHENTICATE_FAILURE })
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
              (error) => dispatch({ type: AUTHENTICATE_FAILURE })
          )
      }
  },
  logout(){
    localStorage.removeItem('token');
    return {
      type: LOGOUT
    }
  }
}

export default AuthenticationActionCreator;
