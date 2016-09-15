import {
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_EDIT_FAILURE,
  IMAGE_FLIP_SUCCESS,
  IMAGE_MIRROR_SUCCESS,
  TOGGLE_AUTO_SAVE,
  SAVE_EDIT_STATE,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAILURE
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
}

export default ImageEditActionCreator;
