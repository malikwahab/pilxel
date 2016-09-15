import { SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, LOAD_EDIT_IMAGE} from '../constants';

const EditModalActionCreator = {
    showModal(id){
        return (dispatch) => {
          dispatch({type: SHOW_EDIT_MODAL, currentImage: id}),
          dispatch({type: LOAD_EDIT_IMAGE, currentImage: id})
        }
    },
    closeModal(){
        return {
            type: CLOSE_EDIT_MODAL
        }
    }
}

export default EditModalActionCreator;
