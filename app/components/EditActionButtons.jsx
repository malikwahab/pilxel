import React, { Component, PropTypes } from 'react';
import InputSwitch from 'react-input-switch';
import { connect } from 'react-redux';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { Button } from 'react-bootstrap';
import EditButton from './EditButton';


class EditActionButtons extends Component {
    render(){
        return(
            <div className="edit-action-btn" >
                <div className="auto-save-btn" >
                  <InputSwitch checked={this.props.autoSave}
                               onChange={this.props.toggleAutoSave} />
                  <span className="auto-save-text" > Auto save is {this.props.autoSave? "ON": "OFF"}</span>
                </div>
                <div className="save-down-wrapper pull-right">
                    <Button bsStyle="success" bsSize="xsmall" onClick={this.props.save.bind(this, this.props.currentEditImage, this.props.editObject)}>
                      Save<i className="material-icons">save</i>
                    </Button>
                    <Button bsStyle="info" bsSize="xsmall">Download<i className="material-icons">file_download</i></Button>
                </div>
            </div>
        )
    }
}

EditActionButtons.proptypes = {
    autoSave: PropTypes.bool,
    editObject: PropTypes.object,
    currentImage: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        autoSave: state.imageEdit.autoSave,
        editObject: state.imageEdit.editObject,
        currentEditImage: state.imageEdit.currentEditImage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAutoSave: () => dispatch(ImageEditActionCreator.toggleAutoSave()),
        save: (id, editObject) => dispatch(ImageEditActionCreator.save(id, editObject))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditActionButtons);
