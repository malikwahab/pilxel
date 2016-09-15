import {
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_FLIP_SUCCESS,
  IMAGE_MIRROR_SUCCESS,
  IMAGE_EDIT_FAILURE,
  LOAD_EDIT_IMAGE,
  TOGGLE_AUTO_SAVE,
  SAVE_EDIT_STATE,
  CLEAR_EDIT_STATE,
  IMAGE_SAVE_SUCCESS
} from '../constants';

const initialState = {
  currentFlipState: false,
  currentMirrorState: false,
  editImageSrc: '',
  editingImage: false,
  editObject: null,
  autoSave: false
}

export const imageEdit = (state = initialState, action) => {
  switch (action.type) {
  case IMAGE_EDIT_REQUEST:
    return Object.assign({}, state, { editingImage: true });
  case CLEAR_EDIT_STATE:
    return Object.assign({}, state, initialState)
  case LOAD_EDIT_IMAGE:
    return Object.assign({}, state, {editImageSrc: `/api/v1/images/${action.currentImage}/`, currentEditImage: action.currentImage})
  case IMAGE_MIRROR_SUCCESS:
    return Object.assign({}, state, { editingImage: false, editImageSrc: action.newImageSrc,
      currentMirrorState: !state.currentMirrorState });
  case IMAGE_FLIP_SUCCESS:
    return Object.assign({}, state, { editingImage: false, editImageSrc: action.newImageSrc,
      currentFlipState: !state.currentFlipState });
  case TOGGLE_AUTO_SAVE:
    return Object.assign({}, state, { autoSave: !state.autoSave});
  case SAVE_EDIT_STATE:
    return Object.assign({}, state, { editObject: action.editObject});
  case IMAGE_SAVE_SUCCESS:
    return Object.assign({}, state, { editObject: null});
  default:
    return state;
  }
}
