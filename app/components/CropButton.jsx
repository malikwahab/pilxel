import React, {Component, PropTypes} from 'react';
import EditButton from './EditButton';
import { connect } from 'react-redux';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';

class CropButton extends Component {
  render(){
    return(
      <div className="edit-btn-container">
        <EditButton icon="crop" title="crop" edit={this.props.crop.bind(this, this.props.currentEditImage, this.props.cropObject, this.props.autoSave)}/>
        <EditButton icon="cancel" title="cancel" edit={this.props.cancel}/>
      </div>
    )
  }
}

CropButton.proptypes = {
    crop: PropTypes.func,
    cancel: PropTypes.func,
    autoSave: PropTypes.bool,
    cropObject: PropTypes.object,
    currentEditImage: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    cropObject: state.imageEdit.cropObject,
    autoSave: state.imageEdit.autoSave,
    currentEditImage: state.imageEdit.currentEditImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    crop: (id, crop, autoSave) => dispatch(ImageEditActionCreator.crop(id, crop, autoSave)),
    cancel: () => dispatch(ImageEditActionCreator.toggleCropShow())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CropButton);
