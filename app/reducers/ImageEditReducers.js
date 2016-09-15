import {
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_FLIP_SUCCESS,
  IMAGE_MIRROR_SUCCESS,
  IMAGE_EDIT_FAILURE,
  LOAD_EDIT_IMAGE
} from '../constants';

const initialState = {
  currentFlipState: false,
  currentMirrorState: false,
  editImageSrc: '',
  editingImage: false
}

export const imageEdit = (state = initialState, action) => {
  switch (action.type) {
  case IMAGE_EDIT_REQUEST:
    return Object.assign({}, state, { editingImage: true });
  case LOAD_EDIT_IMAGE:
    return Object.assign({}, state, {editImageSrc: `/api/v1/images/${action.currentImage}/`, currentEditImage: action.currentImage})
  case IMAGE_MIRROR_SUCCESS:
    return Object.assign({}, state, { editingImage: false, editImageSrc: action.newImageSrc,
      currentMirrorState: !state.currentMirrorState });
  case IMAGE_FLIP_SUCCESS:
    return Object.assign({}, state, { editingImage: false, editImageSrc: action.newImageSrc,
      currentFlipState: !state.currentFlipState });
  default:
    return state;
  }
}
