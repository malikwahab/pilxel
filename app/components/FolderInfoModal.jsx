import React, {Component, PropTypes} from 'react';
import {
  Modal,
  Glyphicon,
  Col,
  Row,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import FolderInfoActionCreator from '../actions/FolderInfoActionCreator';
import { connect } from 'react-redux';

class FolderInfoModal extends Component {
  render() {
    return (
      <Modal show={this.props.folderInfoModalShow} onHide={this.props.closeFolderInfo} className="edit-image-modal">
        <Modal.Header closeButton>
          <Modal.Title>Hello</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    )
  }
}

FolderInfoModal.proptypes = {
  folderInfoModalShow: PropTypes.bool,
  closeFolderInfo: PropTypes.func,
  folder: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    folderInfoModalShow: state.modalShow.folderInfoModalShow,
    folder: state.modalShow.folder
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    closeFolderInfo: () => dispatch(FolderInfoActionCreator.closeFolderInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderInfoModal);
