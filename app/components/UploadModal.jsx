import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import ImageUploadActionCreator from '../actions/ImageUploadActionCreator';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class UploadModal extends Component {
  constructor(){
    super();
    this.state = {
      file: null,
      preview: "",
      name: "",
      folder: "",
      disbaleUpload: true,
      showValidation: false
    };
  }
  onDrop(files){
    const file = files[0];
    this.setState({
      file: file,
      preview: file.preview,
      disbaleUpload: false,
    });
  }
  onUpload(){
    if(this.state.name !== "" && this.state.file !== null){
      this.props.upload(this.state.name, this.state.file);
    }
    else {
      this.setState({
        showValidation: true
      });
    }
  }
  onSelectFolder(event){
    console.log(event.target.value);
  }
  handleFieldChange(event) {
     event.preventDefault();
     const key = event.target.name;
     const value = event.target.value;
     this.setState({
       [key]: value,
     });
   }
  render(){
    const validationState = this.state.showValidation ? "error" : null;
    return(
        <Modal show={this.props.uploadModalShow} onHide={this.props.closeUploadModal} className="edit-image-modal">
          <Modal.Header closeButton>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="img-edit-container drop-zone-container" >
            {this.props.showPreview ? <img src={this.state.preview} /> : null}
            <FormGroup validationState={validationState}>
              <ControlLabel>Image Name</ControlLabel>
              <FormControl type="text" name="name" value={this.state.name} onChange={this.handleFieldChange.bind(this)} className="img-name-input" placeholder="Image Name"/>
            </FormGroup>
            <FormGroup >
              <ControlLabel>Folder</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleFieldChange.bind(this)} name="folder">
                <option value="Root">Root Folder</option>
                <option value="other">Adventure</option>
              </FormControl>
            </FormGroup>
            <Dropzone multiple={false} maxSize={3000000} onDrop={this.onDrop.bind(this)}>
              <div className="drop-zone">Drop an Image here, or click to select files to upload. File Upload should not be more than 3MB</div>
            </Dropzone>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsSize="small" bsStyle="info" disabled={this.state.disbaleUpload} onClick={this.onUpload.bind(this)}>Upload</Button>
            <Button bsSize="small" onClick={this.props.closeUploadModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

UploadModal.proptypes = {
  upload: PropTypes.func,
  closeUploadModal: PropTypes.func,
  uploadModalShow: PropTypes.bool,
  showPreview: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    uploadModalShow: state.modalShow.uploadModalShow,
    showPreview: state.imageUpload.showPreview
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeUploadModal: () => dispatch(ImageUploadActionCreator.toggleUploadModal()),
    upload: (name, file) => dispatch(ImageUploadActionCreator.uploadImage(name, file))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal)
