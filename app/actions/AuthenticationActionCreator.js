import { AUTHENTICATE_SUCCESS,AUTHENTICATE_FAILURE, AUTHENTICATE_REQUEST } from '../constants';
import AuthenticateAPI from '../api/AppAPI';

const AuthenticationActionCreator = {

  login(credentials) {
      return (dispatch) => {
          dispatch({ type: AUTHENTICATE_REQUEST });
          AuthenticateAPI.loginUser(credentials).then(
              (response) => dispatch({ type: AUTHENTICATE_SUCCESS }),
              (error) => dispatch({ type: AUTHENTICATE_FAILURE })
          )
      }
  },
  signUp(credentials) {
      return (dispatch) => {
          dispatch({ type: AUTHENTICATE_REQUEST });
          AuthenticateAPI.signUpUser(credentials).then(
              (response) => dispatch({ type: AUTHENTICATE_SUCCESS }),
              (error) => dispatch({ type: AUTHENTICATE_FAILURE })
          )
      }
  }
}

export default AuthenticationActionCreator;
