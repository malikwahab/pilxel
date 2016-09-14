import { SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL} from '../constants';

const EditModalActionCreator = {
    showModal(id){
        return {
            type: SHOW_EDIT_MODAL,
            currentImage: id
        }
    },
    closeModal(){
        return {
            type: CLOSE_EDIT_MODAL
        }
    }
}

export default EditModalActionCreator;
