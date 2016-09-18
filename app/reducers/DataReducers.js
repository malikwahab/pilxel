import update from 'react-addons-update';
import {
  IMAGE_FETCH_REQUEST,
  IMAGE_FETCH_SUCCESS,
  IMAGE_FETCH_FAILURE,
  FOLDER_FETCH_REQUEST,
  FOLDER_FETCH_SUCCESS,
  FOLDER_FETCH_FAILURE,
  SHOW_FOLDER,
  IMAGE_UPLOAD_SUCCESS,
  FOLDER_ADD_SUCCESS,
  FOLDER_ADD_FAILURE
} from '../constants';

const initialState = {
  images: [],
  folders: [],
  displayedImageFolder: null,
  isRootFolder: true
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_FETCH_SUCCESS:
      return update(state, { images: { $set: action.images } });
    case FOLDER_FETCH_SUCCESS:
      return update(state, { folders: { $set: action.folders } });
    case SHOW_FOLDER:
      return update(state, {$merge: {displayedImageFolder: action.id, isRootFolder: !action.id}});
    case IMAGE_UPLOAD_SUCCESS:
      return update(state, {images: {$push: [action.newImage]}});
    case FOLDER_ADD_SUCCESS:
      return update(state, {folders: {$push: [action.newFolder]}});
    default:
      return state;
  }
};

export default data;
