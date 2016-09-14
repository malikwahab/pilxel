import React, {Component, PropTypes} from 'react';
import {Modal, Glyphicon, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import InfoModalActionCreator from '../actions/InfoModalActionCreator';
import EditModalActionCreator from '../actions/EditModalActionCreator';

class ImageInfoModal extends Component {

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.currentImage != this.props.currentImage) {
      this.props.fetchImageDetails(nextProps.currentImage);
    }
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
            </Col>
          </Row>
          <Row className="image-info-btn">
            <Button className="image-info-edit-btn" onClick={this.props.openEditModal.bind(null, this.props.currentImage)}>Edit</Button>
            <Button bsStyle="primary">Share On Facebook</Button>
            <Button bsStyle="danger">Delete</Button>
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
  details: PropTypes.object
}

const mapStateToProps = (state) => {
  return {infoModalShow: state.modalShow.infoModalShow, details: state.modalShow.imageDetails, currentImage: state.modalShow.currentInfoImage}
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeInfoModal: () => dispatch(InfoModalActionCreator.closeModal()),
    openEditModal: (id) => dispatch(EditModalActionCreator.showModal(id)),
    fetchImageDetails: (image_id) => dispatch(InfoModalActionCreator.fetchImageDetails(image_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageInfoModal);
