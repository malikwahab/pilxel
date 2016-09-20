import { SHOW_INFO_MODAL, CLOSE_INFO_MODAL, IMAGE_DETAILS_SUCCESS } from '../constants';
import { ImageAPI } from '../api/AppAPI';

const InfoModalActionCreator = {
  showModal(id) {
    return {
      type: SHOW_INFO_MODAL,
      currentImage: id
    }
  },
  closeModal() {
    return {
      type: CLOSE_INFO_MODAL
    }
  },
  fetchImageDetails(id) {
    return (dispatch) => {
      ImageAPI.getImageDetails(id).then(
        (response) => dispatch({
          type: IMAGE_DETAILS_SUCCESS,
          details: response
        })
      );
    };
  },
}

export default InfoModalActionCreator;
