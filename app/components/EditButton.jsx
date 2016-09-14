import React, {Component, PropTypes} from 'react';


class EditButton extends Component {
  render() {
    return (
      <div className="edit-btn">
        <i className="material-icons">{this.props.icon}</i>
        <span className="edit-btn-title">{this.props.title}</span>
      </div>
    )
  }
}

EditButton.proptypes = {
    icon: PropTypes.string,
    title: PropTypes.string
}

export default EditButton;
