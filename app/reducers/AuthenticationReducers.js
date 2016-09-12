import { AUTHENTICATE_SUCCESS,AUTHENTICATE_FAILURE, AUTHENTICATE_REQUEST } from '../constants';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false
}

export const authenticate = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_REQUEST:
          return Object.assign({}, state, {isFetching: true, isAuthenticated: false});
        case AUTHENTICATE_SUCCESS:
          return Object.assign({}, state, {isFetching: false, isAuthenticated: true, token: action.token});
        case AUTHENTICATE_FAILURE:
          return Object.assign({}, state, {isFetching:false, isAuthenticated: false, error: true});
        default:
          return state
    }
}
