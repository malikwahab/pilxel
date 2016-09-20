import { ImageAPI } from '../api/AppAPI';
import {
    TOGGLE_UPLOAD_MODAL,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAILURE
} from '../constants';

const ImageUploadActionCreator = {
  toggleUploadModal(){
    return {
      type: TOGGLE_UPLOAD_MODAL
    };
  },
  uploadImage(name, file, folder){
    return (dispatch) => {
      dispatch({ type: IMAGE_UPLOAD_REQUEST });
      ImageAPI.uploadImage(name, file, folder).then(
        (response) => dispatch({ type: IMAGE_UPLOAD_SUCCESS, newImage: response}),
        (error) => dispatch({ type: IMAGE_UPLOAD_FAILURE })
      );
    };
  },
}

export default ImageUploadActionCreator;
