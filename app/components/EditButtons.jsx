import React, {Component, PropTypes} from 'react';
import EditButton from './EditButton';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { connect } from 'react-redux';


class EditButtons extends Component {
  render() {
    const editButtons = [
      {
        icon: "tune",
        title: "Adjust",
        edit: this.props.showAdjustButton
      }, {
        icon: "dns",
        title: "Flip",
        edit: this.props.flip.bind(this, this.props.currentEditImage, !this.props.currentFlipState, this.props.autoSave)
      }, {
        icon: "flip",
        title: "Mirror",
        edit: this.props.mirror.bind(this, this.props.currentEditImage, !this.props.currentMirrorState, this.props.autoSave)
      }, {
        icon: "rotate_right",
        title: "Rotate",
        edit: this.props.showRotateRange
      }, {
        icon: "crop",
        title: "Crop",
        edit: this.props.showCrop
      }, {
        icon: "filter",
        title: "Filter",
        edit: this.props.showFilters
      },
    ];
    return (
      <div className="edit-btn-container">
        {editButtons.map((button, i) => {
          return (<EditButton key={i} {...button}/>)
        })}
      </div>
    )
  }
}

EditButtons.proptypes = {
    currentEditImage: PropTypes.string,
    currentMirrorState: PropTypes.bool,
    currentFlipState: PropTypes.bool,
    autoSave: PropTypes.bool,
    mirror: PropTypes.func,
    flip: PropTypes.func,
    showAdjustButton: PropTypes.func,
    showFilters: PropTypes.func,
    showCrop: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        currentEditImage: state.imageEdit.currentEditImage,
        currentMirrorState: state.imageEdit.currentMirrorState,
        currentFlipState: state.imageEdit.currentFlipState,
        autoSave: state.imageEdit.autoSave
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        mirror: (id, mirrorState) => dispatch(ImageEditActionCreator.mirror(id, mirrorState)),
        flip: (id, flipState, autoSave)  => dispatch(ImageEditActionCreator.flip(id, flipState, autoSave)),
        showRotateRange: () => dispatch(ImageEditActionCreator.toggleRotateRange()),
        showAdjustButton: () => dispatch(ImageEditActionCreator.toggleAdjustButtons()),
        showFilters: () => dispatch(ImageEditActionCreator.toggleFilterShow()),
        showCrop: () => dispatch(ImageEditActionCreator.toggleCropShow())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditButtons);
