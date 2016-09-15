import { SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, LOAD_EDIT_IMAGE, CLEAR_EDIT_STATE} from '../constants';

const EditModalActionCreator = {
    showModal(id){
        return (dispatch) => {
          dispatch({type: SHOW_EDIT_MODAL, currentImage: id}),
          dispatch({type: LOAD_EDIT_IMAGE, currentImage: id})
        }
    },
    closeModal(){
        return (dispatch) => {
            dispatch({type: CLOSE_EDIT_MODAL}),
            dispatch({type: CLEAR_EDIT_STATE})
        }
    },
}

export default EditModalActionCreator;
