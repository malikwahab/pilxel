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
  FOLDER_ADD_FAILURE,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAILURE,
  FOLDER_UPDATE_SUCESS,
  FOLDER_UPDATE_FAILURE,
  IMAGE_DETAILS_UPDATE_FAILURE,
  IMAGE_DETAILS_UPDATE_SUCCESS,
  LOGOUT
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
    case IMAGE_DELETE_SUCCESS:
      let imageIndex = getImageIndex(state, action.id);
      return update(state, {images: {$splice: [[imageIndex, 1]]}});
    case FOLDER_UPDATE_SUCESS:
      let folderIndex = getFolderIndex(state, action.folder.id);
      return update(state, {folders: { [folderIndex] : {$set: action.folder}}});
    case IMAGE_DETAILS_UPDATE_SUCCESS:
      imageIndex = getImageIndex(state, action.image.id);
      return update(state, {images: { [imageIndex] : {$set: action.image}}});
    case LOGOUT:
      return update(state, {$set: initialState});
    default:
      return state;
  }
};

export default data;

export const getImageIndex = (state, id) => state.images.findIndex((image)=>image.id == id);
export const getFolderIndex = (state, id) => state.folders.findIndex((folder)=>folder.id == id);
