import { TOGGLE_LOGIN, TOGGLE_SIGNUP } from '../constants'

const initalState = {
    loginShow: false,
    signUpShow: false,
    langingElementShow: true
}

export const showLogin = ( state = initalState, action ) => {
  switch(action.type){
    case TOGGLE_LOGIN:
      return Object.assign({}, state, {loginShow: !state.loginShow, langingElementShow: !state.langingElementShow});
    default:
      return state;
  }
}
