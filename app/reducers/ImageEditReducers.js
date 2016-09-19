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
  IMAGE_SAVE_SUCCESS,
  TOGGLE_MAIN_EDIT_BUTTON,
  TOGGLE_ROTATE_RANGE,
  TOGGLE_ADJUST_BUTTONS,
  TOGGLE_BRIGHTNESS_RANGE,
  TOGGLE_CONTRAST_RANGE,
  TOGGLE_COLOR_RANGE,
  TOGGLE_SHARPNESS_RANGE,
  TOGGLE_FILTERS_SHOW,
  TOGGLE_MAIN_IMAGE,
  TOGGLE_CROP_IMAGE,
  SET_CROP_STATE,
  LOGOUT
} from '../constants';

const initialState = {
  currentFlipState: false,
  currentMirrorState: false,
  editImageSrc: '',
  editingImage: false,
  editObject: null,
  mainEditbtnShow: true,
  rotateRangeShow: false,
  adjustButtonsShow: false,
  contrastRangeShow: false,
  brightnessRangeShow: false,
  colorRangeShow: false,
  contrastRangeShow: false,
  filtersShow: false,
  sharpnessRangeShow: false,
  mainImageShow: true,
  cropImageShow: false,
  cropObject: null,
  autoSave: false
}

export const imageEdit = (state = initialState, action) => {
  switch (action.type) {
  case IMAGE_EDIT_REQUEST:
    return Object.assign({}, state, { editingImage: true });
  case CLEAR_EDIT_STATE:
    return Object.assign({}, state, initialState);
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
    return Object.assign({}, state, { editObject: null, editingImage: false});
  case TOGGLE_MAIN_EDIT_BUTTON:
    return Object.assign({}, state, {mainEditbtnShow: !state.mainEditbtnShow});
  case TOGGLE_ROTATE_RANGE:
    return Object.assign({}, state, {rotateRangeShow: !state.rotateRangeShow});
  case IMAGE_EDIT_SUCCESS:
    return Object.assign({}, state, {editingImage: false, editImageSrc: action.newImageSrc});
   case TOGGLE_ADJUST_BUTTONS:
    return Object.assign({}, state, {adjustButtonsShow: !state.adjustButtonsShow});
  case TOGGLE_BRIGHTNESS_RANGE:
    return Object.assign({}, state, {brightnessRangeShow: !state.brightnessRangeShow});
  case TOGGLE_COLOR_RANGE:
    return Object.assign({}, state, {colorRangeShow: !state.colorRangeShow});
  case TOGGLE_CONTRAST_RANGE:
    return Object.assign({}, state, {contrastRangeShow: !state.contrastRangeShow});
  case TOGGLE_SHARPNESS_RANGE:
    return Object.assign({}, state, {sharpnessRangeShow: !state.sharpnessRangeShow});
  case TOGGLE_FILTERS_SHOW:
    return Object.assign({}, state, {filtersShow: !state.filtersShow});
  case TOGGLE_MAIN_IMAGE:
    return Object.assign({}, state, {mainImageShow: !state.mainImageShow});
  case TOGGLE_CROP_IMAGE:
    return Object.assign({}, state, {cropImageShow: !state.cropImageShow});
  case SET_CROP_STATE:
    return Object.assign({}, state, {cropObject: action.cropState});
  case LOGOUT:
    return Object.assign({}, state, {initialState});
  default:
    return state;
  }
}
