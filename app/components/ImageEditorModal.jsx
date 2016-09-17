import React, { Component, PropTypes } from 'react';
import { Modal, Glyphicon, Col, Row, Button } from 'react-bootstrap';
import EditModalActionCreator from '../actions/EditModalActionCreator';
import ImageEditActionCreator from '../actions/ImageEditActionCreator';
import { connect } from 'react-redux';
import EditButtons from './EditButtons';
import EditActionButtons from './EditActionButtons';
import RangeEditButton from './RangeEditButton';
import AdjustButtons from './AdjustButtons';
import Filters from './Filters';
import CropContainer from './CropContainer';
import CropButton from './CropButton';

class ImageEditorModal extends Component {
    render(){
        return (
            <Modal show={this.props.editModalShow} onHide={this.props.closeEditModal} className="edit-image-modal">
              <Modal.Header closeButton>
                <Modal.Title>Edit Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <EditActionButtons />
                <div className="img-edit-container">
                  {this.props.mainImageShow ? <img src={this.props.imageSrc} alt="Image Editor" /> : null }
                  {this.props.cropImageShow ? <CropContainer imageSrc={this.props.imageSrc} /> : null}
                </div>
                {this.props.mainEditbtnShow ? <EditButtons /> : null}
                {this.props.rotateRangeShow ? <RangeEditButton onChangeComplete={this.props.rotateRangeOnChangeComplete} close={this.props.closeRotateRange} min={0} max={360} defaultValue={0}/> : null}
                {this.props.brightnessRangeShow ? <RangeEditButton onChangeComplete={this.props.brightnessRangeOnChangeComplete} close={this.props.closeBrightnessRange} min={-10} max={10} defaultValue={0} /> : null}
                {this.props.contrastRangeShow ? <RangeEditButton onChangeComplete={this.props.contrastRangeOnChangeComplete} close={this.props.closeContrastRange} min={-10} max={10} defaultValue={0} /> : null}
                {this.props.sharpnessRangeShow? <RangeEditButton onChangeComplete={this.props.sharpnessRangeOnChangeComplete} close={this.props.closeSharpnessRange} min={-10} max={10} defaultValue={0} /> : null}
                {this.props.colorRangeShow ? <RangeEditButton onChangeComplete={this.props.colorRangeOnChangeComplete} close={this.props.closeColorRange} min={-10} max={10} defaultValue={0} /> : null}
                {this.props.adjustButtonsShow ? <AdjustButtons /> : null }
                {this.props.filtersShow ? <Filters /> : null }
                {this.props.cropImageShow ? <CropButton /> : null}
              </Modal.Body>
            </Modal>
        )
    }
}

ImageEditorModal.proptypes = {
    editModalShow: PropTypes.bool,
    closeEditModal: PropTypes.func,
    imageSrc: PropTypes.string,
    mainEditbtnShow: PropTypes.bool,
    rotateRangeShow: PropTypes.bool,
    adjustButtonsShow: PropTypes.bool,
    brightnessRangeShow: PropTypes.bool,
    contrastRangeShow: PropTypes.bool,
    sharpnessRangeShow: PropTypes.bool,
    colorRangeShow: PropTypes.bool,
    filtersShow: PropTypes.bool,
    closeBrightnessRange: PropTypes.func,
    closeRotateRange: PropTypes.func,
    rotateRangeOnChangeComplete: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        editModalShow: state.modalShow.editModalShow,
        imageSrc: state.imageEdit.editImageSrc,
        mainEditbtnShow: state.imageEdit.mainEditbtnShow,
        rotateRangeShow: state.imageEdit.rotateRangeShow,
        adjustButtonsShow: state.imageEdit.adjustButtonsShow,
        brightnessRangeShow: state.imageEdit.brightnessRangeShow,
        contrastRangeShow: state.imageEdit.contrastRangeShow,
        sharpnessRangeShow: state.imageEdit.sharpnessRangeShow,
        colorRangeShow: state.imageEdit.colorRangeShow,
        filtersShow: state.imageEdit.filtersShow,
        cropImageShow: state.imageEdit.cropImageShow,
        mainImageShow: state.imageEdit.mainImageShow
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeEditModal: () => dispatch(EditModalActionCreator.closeModal()),
        closeRotateRange: () => dispatch(ImageEditActionCreator.toggleRotateRange()),
        closeBrightnessRange: () => dispatch(ImageEditActionCreator.toggleBrightnessRange()),
        closeContrastRange: () => dispatch(ImageEditActionCreator.toggleContrastRange()),
        closeSharpnessRange: () => dispatch(ImageEditActionCreator.toggleSharpnessRange()),
        closeColorRange: () => dispatch(ImageEditActionCreator.toggleColorRange()),
        rotateRangeOnChangeComplete: (id, degree, autoSave) => dispatch(ImageEditActionCreator.rotate(id, degree, autoSave)),
        brightnessRangeOnChangeComplete: (id, degree, autoSave) => dispatch(ImageEditActionCreator.brightness(id, degree, autoSave)),
        contrastRangeOnChangeComplete: (id, degree, autoSave) => dispatch(ImageEditActionCreator.contrast(id, degree, autoSave)),
        sharpnessRangeOnChangeComplete: (id, degree, autoSave) => dispatch(ImageEditActionCreator.sharpness(id, degree, autoSave)),
        colorRangeOnChangeComplete: (id, degree, autoSave) => dispatch(ImageEditActionCreator.color(id, degree, autoSave)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageEditorModal);
