import { SHOW_INFO_MODAL, CLOSE_INFO_MODAL, IMAGE_DETAILS_SUCCESS,
  SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, IMAGE_EDIT_SUCCESS, TOGGLE_UPLOAD_MODAL } from '../constants';

const initialState = {
  infoModalShow: false,
  editModalShow: false,
  currentInfoImage: null,
  uploadModalShow: false,
  imageDetails: {}
}

export const modalShow = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_INFO_MODAL:
    return Object.assign({}, state, { infoModalShow: true, currentInfoImage: action
        .currentImage });
  case CLOSE_INFO_MODAL:
    return Object.assign({}, state, { infoModalShow: false });
  case IMAGE_DETAILS_SUCCESS:
    return Object.assign({}, state, { imageDetails: action.details });
  case SHOW_EDIT_MODAL:
    return Object.assign({}, state, { editModalShow: true, infoModalShow: false});
  case CLOSE_EDIT_MODAL:
    return Object.assign({}, state, { editModalShow: false });
  case TOGGLE_UPLOAD_MODAL:
    return Object.assign({}, state, { uploadModalShow: !state.uploadModalShow });
  default:
    return state;
  }
}
