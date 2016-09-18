import { ImageAPI } from '../api/AppAPI';
import {
  IMAGE_FETCH_REQUEST,
  IMAGE_FETCH_SUCCESS,
  IMAGE_FETCH_FAILURE,
  FOLDER_FETCH_REQUEST,
  FOLDER_FETCH_SUCCESS,
  FOLDER_FETCH_FAILURE,
  SHOW_FOLDER,
  SHOW_ROOT_FOLDER,
  FOLDER_ADD_SUCCESS,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_FAILURE
} from '../constants';

const DataActionCreator = {
  fetchImages() {
    return (dispatch) => {
      dispatch({ type: IMAGE_FETCH_REQUEST });
      ImageAPI.fetchImages().then(
        (response) => dispatch({ type: IMAGE_FETCH_SUCCESS, images: response }),
        (error) => dispatch({ type: IMAGE_FETCH_FAILURE })
      );
    };
  },
  fetchFolders() {
    return (dispatch) => {
      dispatch({ type: FOLDER_FETCH_REQUEST });
      ImageAPI.fetchFolders().then(
        (response) => dispatch({ type: FOLDER_FETCH_SUCCESS, folders: response }),
        (error) => dispatch({ type: FOLDER_FETCH_FAILURE })
      );
    };
  },
  showFolder(id) {
    return {
      type: SHOW_FOLDER,
      id
    }
  },
  addFolder(name) {
    return (dispatch) => {
      ImageAPI.addFolder(name).then(
        (response) => dispatch({ type: FOLDER_ADD_SUCCESS, newFolder: response }),
        (error) => dispatch({ type: FOLDER_ADD_FAILURE })
      );
    };
  },
  deleteImage(id) {
    return (dispatch) => {
      ImageAPI.deleteImage(id).then(
        (response) => dispatch({ type: IMAGE_DELETE_SUCCESS, id: id}),
        (error) => dispatch({ type: IMAGE_DELETE_FAILURE })
      );
    };
  },
  updateFolder(id, name) {
    return (dispatch) => {
      ImageAPI.updateFolder(id, name).then(
        (response) => dispatch({ type: FOLDER_UPDATE_SUCESS, folder: response}),
        (error) => dispatch({type: FOLDER_UPDATE_FAILURE })
      );
    };
  }
};

export default DataActionCreator;
