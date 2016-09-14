import React, { Component, PropTypes } from 'react';
import { Modal, Glyphicon, Col, Row, Button } from 'react-bootstrap';
import EditModalActionCreator from '../actions/EditModalActionCreator';
import { connect } from 'react-redux';
import EditButtons from './EditButtons';

class ImageEditorModal extends Component {
    render(){
        return (
            <Modal show={this.props.editModalShow} onHide={this.props.closeEditModal} className="edit-image-modal">
              <Modal.Header closeButton>
                <Modal.Title>Edit Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="img-edit-container">
                  <img src="{this.props.imageSrc}" alt="Image Editor" />
                </div>
                <EditButtons />
              </Modal.Body>
            </Modal>
        )
    }
}

ImageEditorModal.proptypes = {
    editModalShow: PropTypes.bool,
    closeEditModal: PropTypes.func,
    currentImage: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        editModalShow: state.modalShow.editModalShow,
        currentImage: state.modalShow.currentEditImage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeEditModal: () => dispatch(EditModalActionCreator.closeModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorModal);
