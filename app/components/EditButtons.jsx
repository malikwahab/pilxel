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
        edit: this.props.mirror
      }, {
        icon: "dns",
        title: "Flip",
        edit: this.props.flip.bind(this, this.props.currentEditImage, !this.props.currentFlipState)
      }, {
        icon: "flip",
        title: "Mirror",
        edit: this.props.mirror.bind(this, this.props.currentEditImage, !this.props.currentMirrorState)
      }, {
        icon: "photo_size_select_large",
        title: "Resize",
        edit: this.props.mirror
      }, {
        icon: "rotate_right",
        title: "Rotate",
        edit: this.props.mirror
      }, {
        icon: "crop",
        title: "Crop",
        edit: this.props.mirror
      }, {
        icon: "filter",
        title: "Filter",
        edit: this.props.mirror
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
    mirror: PropTypes.func,
    flip: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        currentEditImage: state.imageEdit.currentEditImage,
        currentMirrorState: state.imageEdit.currentMirrorState,
        currentFlipState: state.imageEdit.currentFlipState
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        mirror: (id, mirrorState) => dispatch(ImageEditActionCreator.mirror(id, mirrorState)),
        flip: (id, flipState)  => dispatch(ImageEditActionCreator.flip(id, flipState)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditButtons);
