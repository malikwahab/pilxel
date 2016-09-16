import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageContainer from './ImageContainer';
import ImageInfoModal from './ImageInfoModal';
import ImageEditorModal from './ImageEditorModal';

class PilxelContent extends Component {
  render() {
    return (
      <Grid fluid className="page-content-wrapper">
        <Row className="show-grid">
          <ImageContainer id="1"/>
          <ImageContainer id="2"/>
        </Row>
        <ImageInfoModal/>
        <ImageEditorModal/>
      </Grid>
    )
  }
}

export default PilxelContent;
