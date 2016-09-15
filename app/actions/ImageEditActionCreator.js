import {
  IMAGE_EDIT_REQUEST,
  IMAGE_EDIT_SUCCESS,
  IMAGE_EDIT_FAILURE,
  IMAGE_FLIP_SUCCESS,
  IMAGE_MIRROR_SUCCESS
} from '../constants';
import { ImageAPI } from '../api/AppAPI';


const ImageEditActionCreator = {
  mirror(id, mirrorState) {
    return (dispatch) => {
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.mirror(id, mirrorState).then(
        (response) => dispatch({ type: IMAGE_MIRROR_SUCCESS, newImageSrc: response }),
        (error) => dispatch({ type: IMAGE_EDIT_FAILURE })
      );
    };
  },
  flip(id, flipState) {
    return (dispatch) => {
      dispatch({ type: IMAGE_EDIT_REQUEST });
      ImageAPI.flip(id, flipState).then(
        (response) => dispatch({ type: IMAGE_FLIP_SUCCESS, newImageSrc: response }),
        (error) => dispatch({ type: IMAGE_EDIT_FAILURE })
      );
    };
  },
}

export default ImageEditActionCreator;
