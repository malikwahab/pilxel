import {
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_EDIT_FAILURE,
  IMAGE_FLIP_SUCCESS,
  IMAGE_MIRROR_SUCCESS,
  TOGGLE_AUTO_SAVE,
  SAVE_EDIT_STATE,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAILURE,
  TOGGLE_ROTATE_RANGE,
  TOGGLE_MAIN_EDIT_BUTTON,
  TOGGLE_ADJUST_BUTTONS,
  TOGGLE_BRIGHTNESS_RANGE,
  TOGGLE_CONTRAST_RANGE,
  TOGGLE_SHARPNESS_RANGE,
  TOGGLE_COLOR_RANGE
} from '../constants';
import { ImageAPI } from '../api/AppAPI';

const ImageEditActionCreator = {

  mirror(id, mirrorState, autoSave) {
    return (dispatch) => {
      const mirroObject = {
        manipulate: {
          flip: {
            mirror: mirrorState
          }
        },
        save: autoSave
      };
      if (!autoSave) {
        dispatch({ type: SAVE_EDIT_STATE, editObject: mirroObject });
      }
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.editImage(id, mirroObject).then(
        (response) => dispatch({ type: IMAGE_MIRROR_SUCCESS, newImageSrc: response }),
        (error) => dispatch({ type: IMAGE_EDIT_FAILURE })
      );
    };
  },
  flip(id, flipState, autoSave) {
    return (dispatch) => {
      const flipObject = {
        manipulate: {
          flip: {
            top_bottom: flipState
          }
        },
        save: autoSave
      };
      if (!autoSave) {
        dispatch({ type: SAVE_EDIT_STATE, editObject: flipObject });
      }
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.editImage(id, flipObject).then(
        (response) => dispatch({ type: IMAGE_FLIP_SUCCESS, newImageSrc: response }),
        (error) => dispatch({ type: IMAGE_EDIT_FAILURE })
      );
    };
  },
  toggleAutoSave() {
    return {
      type: TOGGLE_AUTO_SAVE
    }
  },
  save(id, editObject) {
    return (dispatch) => {
      const saveObject = Object.assign({}, editObject, { save: true });
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.editImage(id, saveObject).then(
        (response) => dispatch({ type: IMAGE_SAVE_SUCCESS }),
        (error) => dispatch({ type: IMAGE_SAVE_FAILURE })
      );
    };
  },
  toggleRotateRange() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_MAIN_EDIT_BUTTON });
      dispatch({ type: TOGGLE_ROTATE_RANGE });
    };
  },
  toggleAdjustButtons() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_MAIN_EDIT_BUTTON });
      dispatch({ type: TOGGLE_ADJUST_BUTTONS });
    };
  },
  toggleBrightnessRange() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_ADJUST_BUTTONS });
      dispatch({ type: TOGGLE_BRIGHTNESS_RANGE });
    };
  },
  toggleContrastRange() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_ADJUST_BUTTONS });
      dispatch({ type: TOGGLE_CONTRAST_RANGE });
    };
  },
  toggleSharpnessRange() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_ADJUST_BUTTONS });
      dispatch({ type: TOGGLE_SHARPNESS_RANGE });
    };
  },
  toggleColorRange() {
    return (dispatch) => {
      dispatch({ type: TOGGLE_ADJUST_BUTTONS });
      dispatch({ type: TOGGLE_COLOR_RANGE });
    };
  },
  convertEnhanceDegree(degree) {
    if (degree < 0) {
      return ((degree + 10) / 10);
    }
    return degree;
  },
  editImage(id, editObject, autoSave) {
    return (dispatch) => {
      if (!autoSave) {
        dispatch({ type: SAVE_EDIT_STATE, editObject: editObject });
      }
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.editImage(id, editObject).then(
        (response) => dispatch({ type: IMAGE_EDIT_SUCCESS, newImageSrc: response }),
        (error) => dispatch({ type: IMAGE_EDIT_FAILURE })
      );
    }
  },
  rotate(id, degree, autoSave) {
    return (dispatch) => {
      const rotateObject = {
        manipulate: {
          rotate: degree
        },
        save: autoSave
      };
      dispatch(this.editImage(id, rotateObject, autoSave));
    };
  },
  brightness(id, degree, autoSave) {
    degree = this.convertEnhanceDegree(degree);
    return (dispatch) => {
      const brightnessObject = {
        enhance: {
          brightness: degree
        },
        save: autoSave
      };
      dispatch(this.editImage(id, brightnessObject, autoSave));
    };
  },
  color(id, degree, autoSave) {
    degree = this.convertEnhanceDegree(degree);
    return (dispatch) => {
      const brightnessObject = {
        enhance: {
          color: degree
        },
        save: autoSave
      };
      dispatch(this.editImage(id, brightnessObject, autoSave));
    };
  },
  sharpness(id, degree, autoSave) {
    degree = this.convertEnhanceDegree(degree);
    return (dispatch) => {
      const brightnessObject = {
        enhance: {
          sharpness: degree
        },
        save: autoSave
      };
      dispatch(this.editImage(id, brightnessObject, autoSave));
    };
  },
  contrast(id, degree, autoSave) {
    degree = this.convertEnhanceDegree(degree);
    return (dispatch) => {
      const brightnessObject = {
        enhance: {
          contrast: degree
        },
        save: autoSave
      };
      dispatch(this.editImage(id, brightnessObject, autoSave));
    };
  },
}

export default ImageEditActionCreator;
