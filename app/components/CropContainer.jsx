import React, { Component, PropTypes } from 'react';
import ReactCrop from 'react-image-crop';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { connect } from 'react-redux';

class CropContainer extends Component {
  constructor(){
    super();
    this.state = {
      crop: {
        x: 20,
        y:10,
        width: 30,
        height: 30
      }
    };
  }
  onCropComplete(crop){
    this.props.setCropState(crop);
  }
  render(){
    return(
      <ReactCrop crop={this.state.crop} src={this.props.imageSrc} onComplete={(crop) => this.onCropComplete(crop)} />
    )
  }
}

CropContainer.proptypes = {
  setCropState: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCropState: (crop) => dispatch(ImageEditActionCreator.setCropState(crop))
  }
}
export default connect(null, mapDispatchToProps)(CropContainer);
