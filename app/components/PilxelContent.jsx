import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageContainer from './ImageContainer';
import ImageInfoModal from './ImageInfoModal';
import ImageEditorModal from './ImageEditorModal';
import UploadModal from './UploadModal';
import ImageUploadActionCreator from '../actions/ImageUploadActionCreator';
import { connect } from 'react-redux';

class PilxelContent extends Component {
  render() {
    return (
      <Grid fluid className="page-content-wrapper">
        <Row className="show-grid">
          <ImageContainer id="1"/>
          <ImageContainer id="2"/>
          <ImageContainer id="3"/>
          <ImageContainer id="4"/>
        </Row>
        <ImageInfoModal />
        <ImageEditorModal />
        <UploadModal />
        <a className="add-image" ><i className="material-icons" onClick={this.props.showUploadModal}>add_a_photo</i></a>
      </Grid>
    )
  }
}

PilxelContent.proptypes = {
  showUploadModal: PropTypes.func
}
const mapDispatchToProps = (dispatch) => {
  return {
    showUploadModal: () => dispatch(ImageUploadActionCreator.toggleUploadModal())
  }
}

export default connect(null, mapDispatchToProps)(PilxelContent);
