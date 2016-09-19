import React, {Component, PropTypes} from 'react';
import {Modal, Glyphicon, Col, Row, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import InfoModalActionCreator from '../actions/InfoModalActionCreator';
import EditModalActionCreator from '../actions/EditModalActionCreator';
import DataActionCreator from '../actions/DataActionCreator';
import { facebookAPI } from '../api/AppAPI.js';

class ImageInfoModal extends Component {

  constructor(){
    super();
    this.state = {
      showDetailEdit: false,
      name: '',
      folder: 0
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.details.name
    });
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.currentImage != this.props.currentImage) {
      this.props.fetchImageDetails(nextProps.currentImage);
    }
  }
  editImageDetails() {
    let updateObject = {};
    if(this.state.name !== "" && this.state.name !== this.props.details.name){
      updateObject.name = this.state.name;
    }
    if(this.state.folder === 0){
      updateObject.folder = null;
    } else {
      updateObject.folder = this.state.folder;
    }
    if(Object.getOwnPropertyNames(updateObject).length > 0){
      this.props.updateImage(this.props.currentImage, updateObject);
    }
    this.toggleEditImageDetails();
  }
  toggleEditImageDetails(){
    this.setState({
      showDetailEdit: !this.state.showDetailEdit
    });
  }
  shareImage(){
    facebookAPI.shareImage(this.props.currentImage);
  }
  handleFieldChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    this.setState({[key]: value});
  }
  render() {
    return (
      <Modal show={this.props.infoModalShow} onHide={this.props.closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="show-grid img-info-container">
            <Col md={7}>
              <img
                src={`/api/v1/images/${this.props.currentImage}/`}
                alt={this.props.details.name}/>
            </Col>
            <Col md={5} className="img-info">
              <ul >
                <li>
                  <span className="img-details-title">Name</span>: {this.props.details.name}</li>
                <li>
                  <span className="img-details-title">Uploaded</span>: {this.props.details.date_created}</li>
                <li>
                  <span className="img-details-title">Modified</span>: {this.props.details.date_modified}</li>
                <li>
                  <span className="img-details-title">Width</span>: {this.props.details.width}</li>
                <li>
                  <span className="img-details-title">Height</span>: {this.props.details.height}</li>
                <li>
                  <span className="img-details-title">Size</span>: {this.props.details.size}</li>
              </ul>
              {this.state.showDetailEdit ?
              <div className="edit-img-details">
              <FormGroup>
                <ControlLabel>Image Name</ControlLabel>
                <FormControl type="text" name="name" value={this.state.name} onChange={this.handleFieldChange.bind(this)} className="img-name-input" placeholder="Image Name"/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Folder</ControlLabel>
                <select placeholder="select" onChange={this.handleFieldChange.bind(this)} className="form-control" name="folder" value={this.state.folder}>
                  <option value={0}>Root Folder</option>
                  {this.props.folders.map((folder, i) => {
                    return(<option value={folder.id} key={i}>{folder.name}</option>)
                  })}
                </select>
              </FormGroup>
              <Button bsStyle="success" bsSize="small" onClick={this.editImageDetails.bind(this)}>Save</Button>
              <Button bsSize="small" onClick={this.toggleEditImageDetails.bind(this)}>Cancel</Button>
              </div> : null }
            </Col>
          </Row>
          <Row className="image-info-btn">
            <Button className="image-info-edit-btn" onClick={this.props.openEditModal.bind(null, this.props.currentImage)}>Edit</Button>
            <Button className="image-info-edit-btn" onClick={this.toggleEditImageDetails.bind(this)}>Edit Image Details</Button>
            <Button bsStyle="primary" onClick={this.shareImage.bind(this)}>Share On Facebook</Button>
            <Button bsStyle="danger" onClick={(event) => {this.props.deleteImage(this.props.currentImage); this.props.closeInfoModal()}}>Delete</Button>
          </Row>
        </Modal.Body>
      </Modal>
    )
  }
}

ImageInfoModal.proptypes = {
  infoModalShow: PropTypes.bool,
  currentImage: PropTypes.string,
  closeInfoModal: PropTypes.func,
  openEditModal: PropTypes.func,
  deleteImage: PropTypes.func,
  updateImage: PropTypes.func,
  details: PropTypes.object,
  folders: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    infoModalShow: state.modalShow.infoModalShow,
    details: state.modalShow.imageDetails,
    currentImage: state.modalShow.currentInfoImage,
    folders: state.data.folders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeInfoModal: () => dispatch(InfoModalActionCreator.closeModal()),
    openEditModal: (id) => dispatch(EditModalActionCreator.showModal(id)),
    fetchImageDetails: (image_id) => dispatch(InfoModalActionCreator.fetchImageDetails(image_id)),
    deleteImage: (id) => dispatch(DataActionCreator.deleteImage(id)),
    updateImage: (id, updateObject) => dispatch(DataActionCreator.updateImage(id, updateObject)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageInfoModal);
