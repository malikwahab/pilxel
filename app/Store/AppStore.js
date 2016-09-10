import { showLogin } from '../reducers/LandingReducers'
import { createStore } from 'redux';

const store = createStore(showLogin);
export default store;
