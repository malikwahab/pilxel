import { showLogin } from '../reducers/LandingReducers';
import { authenticate } from '../reducers/AuthenticationReducers';
import modalShow from '../reducers/ModalReducers';
import { imageEdit } from '../reducers/ImageEditReducers';
import imageUpload from '../reducers/ImageUploadReducers';
import data from '../reducers/DataReducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { thunkMiddleware } from 'redux-thunk';

const appReducers = combineReducers({showLogin, authenticate, modalShow, imageEdit, imageUpload, data});
// const store = createStore(showLogin);
const store = createStore(appReducers, applyMiddleware(thunk)); // for redux react chrome extention tool
export default store;
