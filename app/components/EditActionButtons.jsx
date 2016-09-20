import React, { Component, PropTypes } from 'react';
import InputSwitch from 'react-input-switch';
import { connect } from 'react-redux';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import DataActionCreator from '../actions/DataActionCreator';
import { Button } from 'react-bootstrap';
import EditButton from './EditButton';


class EditActionButtons extends Component {
    render(){
      const saveButtonState = (this.props.editObject == null) ? true : false;
        return(
            <div className="edit-action-btn" >
                <div className="auto-save-btn" >
                  <InputSwitch checked={this.props.autoSave}
                               onChange={this.props.toggleAutoSave} />
                  <span className="auto-save-text" > Auto save is {this.props.autoSave? "ON": "OFF"}</span>
                </div>
                <div className="save-down-wrapper pull-right">
                    <Button bsSize="xsmall" onClick={this.props.cancel.bind(this, this.props.currentEditImage)}>Canel<i className="material-icons">cancel</i></Button>
                    <Button bsStyle="success"
                            bsSize="xsmall"
                            onClick={this.props.save.bind(this, this.props.currentEditImage, this.props.editObject)}
                            disabled={saveButtonState}>
                      Save<i className="material-icons">save</i>
                    </Button>
                    <Button bsStyle="info" bsSize="xsmall" onClick={DataActionCreator.downloadImage.bind(null, this.props.imageSrc)}>Download<i className="material-icons">file_download</i></Button>
                </div>
            </div>
        )
    }
}

EditActionButtons.proptypes = {
    autoSave: PropTypes.bool,
    editObject: PropTypes.object,
    currentEditImage: PropTypes.string,
    cancel: PropTypes.func,
    save: PropTypes.func,
    toggleAutoSave: PropTypes.func,
    imageSrc: PropTypes.string
}

const mapStateToProps = (state) => {
    return {
        autoSave: state.imageEdit.autoSave,
        editObject: state.imageEdit.editObject,
        currentEditImage: state.imageEdit.currentEditImage,
        imageSrc: state.imageEdit.editImageSrc
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAutoSave: () => dispatch(ImageEditActionCreator.toggleAutoSave()),
        cancel: (id) => dispatch(ImageEditActionCreator.cancel(id)),
        save: (id, editObject) => dispatch(ImageEditActionCreator.save(id, editObject)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditActionButtons);
