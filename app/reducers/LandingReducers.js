import { TOGGLE_LOGIN, TOGGLE_SIGNUP, LOGIN_SUCCESS, LOGOUT } from '../constants';

const initialState = {
    loginShow: false,
    signUpShow: false,
    LandingButtonShow: true
}

export const showLogin = ( state = initialState, action ) => {
  switch(action.type){
    case TOGGLE_LOGIN:
      return Object.assign({}, state, {loginShow: !state.loginShow, LandingButtonShow: !state.LandingButtonShow});
    case TOGGLE_SIGNUP:
      return Object.assign({}, state, {signUpShow: !state.signUpShow, LandingButtonShow: !state.LandingButtonShow});
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {token: action.token, loginShow: !state.loginShow});
    case LOGOUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
