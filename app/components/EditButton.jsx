import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';


class EditButton extends Component {
  render() {
    return (
      <div className="edit-btn" onClick={this.props.edit}>
        <i className="material-icons">{this.props.icon}</i>
        <span className="edit-btn-title">{this.props.title}</span>
      </div>
    )
  }
}

EditButton.proptypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    edit: PropTypes.func,
    currentEditImage: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        currentEditImage: state.modalShow.currentEditImage,
        currentMirrorState: state.modalShow.currentMirrorState
    }
}


export default connect(mapStateToProps)(EditButton);
