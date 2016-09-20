import { TOGGLE_LOGIN, TOGGLE_SIGNUP } from '../constants';


export const LandingActionCreator = {

    toggleLogin(){
        return {
            type: TOGGLE_LOGIN
        }
    },
    toggleSignUp(){
        return {
            type: TOGGLE_SIGNUP
        }
    }
}
