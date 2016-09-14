import React, {Component, PropTypes} from 'react';
import EditButton from './EditButton';

class EditButtons extends Component {
  render() {
    const editButtons = [
      {
        icon: "tune",
        title: "Adjust"
      }, {
        icon: "flip",
        title: "Flip"
      }, {
        icon: "photo_size_select_large",
        title: "Resize"
      }, {
        icon: "rotate_right",
        title: "Rotate"
      }, {
        icon: "crop",
        title: "Crop"
      }, {
        icon: "filter",
        title: "Filter"
      }, {
        icon: "dns",
        title: "Mirror"
      }
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

export default EditButtons;
