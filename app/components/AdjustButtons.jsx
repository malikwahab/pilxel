import React, {Component, PropTypes} from 'react';
import EditButton from './EditButton';
import RangeEditButton from './RangeEditButton';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { connect } from 'react-redux';

class AdjustButtons extends Component {
  render() {
    const adjustButtons = [
      {
        icon: "keyboard_arrow_left",
        title: "back",
        edit: this.props.close
      },
      {
        icon: "brightness_4",
        title: "Brightness",
        edit: this.props.showBrightnessRange
      }, {
        icon: "exposure",
        title: "Contrast",
        edit: this.props.showContrastRange
      }, {
        icon: "filter_center_focus",
        title: "Sharpness",
        edit: this.props.showSharpnessRange
      }, {
        icon: "color_lens",
        title: "Color",
        edit: this.props.showColorRange
      }
    ];
    return (
      <div className="edit-btn-container">
        {adjustButtons.map((button, i) => {
          return (<EditButton key={i} {...button}/>)
        })}
      </div>
    )
  }
}

AdjustButtons.PropTypes = {
  close: PropTypes.func,
  showBrightnessRange: PropTypes.func,
  showColorRange: PropTypes.func,
  showSharpnessRange: PropTypes.func,
  showContrastRange: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => dispatch(ImageEditActionCreator.toggleAdjustButtons()),
    showBrightnessRange: () => dispatch(ImageEditActionCreator.toggleBrightnessRange()),
    showContrastRange: () => dispatch(ImageEditActionCreator.toggleContrastRange()),
    showSharpnessRange: () => dispatch(ImageEditActionCreator.toggleSharpnessRange()),
    showColorRange: () => dispatch(ImageEditActionCreator.toggleColorRange())
  }
}

export default connect(null, mapDispatchToProps)(AdjustButtons);
