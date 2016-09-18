import { showLogin } from '../reducers/LandingReducers';
import { authenticate } from '../reducers/AuthenticationReducers';
import { modalShow } from '../reducers/ModalReducers';
import { imageEdit } from '../reducers/ImageEditReducers';
import imageUpload from '../reducers/ImageUploadReducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { thunkMiddleware } from 'redux-thunk';

const logger = (store) => (next) => (action) => {
  if (typeof action !== "function") {
    console.log('dispatching:', action);
  }
  return next(action);
}

const appReducers = combineReducers({showLogin, authenticate, modalShow, imageEdit, imageUpload});
// const store = createStore(showLogin);
const store = createStore(appReducers, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(logger, thunk)); // for redux react chrome extention tool
export default store;
