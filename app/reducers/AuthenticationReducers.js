import { AUTHENTICATE_SUCCESS,AUTHENTICATE_FAILURE, AUTHENTICATE_REQUEST, LOGOUT } from '../constants';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    username: ''
}

export const authenticate = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_REQUEST:
          return Object.assign({}, state, {isFetching: true, isAuthenticated: false});
        case AUTHENTICATE_SUCCESS:
          return Object.assign({}, state, {isFetching: false, isAuthenticated: true, username: action.username});
        case AUTHENTICATE_FAILURE:
          return Object.assign({}, state, {isFetching:false, isAuthenticated: false, error: true});
        case LOGOUT:
          return Object.assign({}, state, {isAuthenticated: false});
        default:
          return state
    }
}
