import { SHOW_INFO_MODAL, CLOSE_INFO_MODAL, IMAGE_DETAILS_SUCCESS,
  SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, IMAGE_EDIT_SUCCESS, TOGGLE_UPLOAD_MODAL, FACEBOOK_SHARE_SUCCESS, LOGOUT, CLOSE_FOLDER_INFO, SHOW_FOLDER_INFO } from '../constants';

const initialState = {
  infoModalShow: false,
  editModalShow: false,
  currentInfoImage: null,
  folderInfoModalShow: false,
  uploadModalShow: false,
  currentInfoFolder: null,
  imageDetails: {}
}

const modalShow = (state = initialState, action) => {
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
  case LOGOUT:
    return Object.assign({}, state, initialState);
  case SHOW_FOLDER_INFO:
    return Object.assign({}, state, {folderInfoModalShow: true, currentInfoFolder: action.folder});
  case CLOSE_FOLDER_INFO:
    return Object.assign({}, state, {folderInfoModalShow: false, currentInfoFolder: null});
  default:
    return state;
  }
};

export default modalShow;
