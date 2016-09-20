import React, {Component, PropTypes} from 'react';
import {
  Modal,
  Glyphicon,
  Col,
  Row,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import FolderInfoActionCreator from '../actions/FolderInfoActionCreator';
import DataActionCreator from '../actions/DataActionCreator';
import { connect } from 'react-redux';

class FolderInfoModal extends Component {
  constructor(){
    super();
    this.state = {
      showEdit: false,
      name: ''
    }
  }
  toggleEdit(){
    this.setState({
      showEdit: !this.state.showEdit
    });
  }
  handleFieldChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    this.setState({[key]: value});
  }
  render() {
    return (
      <Modal show={this.props.folderInfoModalShow} onHide={this.props.closeFolderInfo} className="folder-info-modal">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.folder.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="folder-details">
            <i className="material-icons">photo</i>
            <span className="images-in-folder">{!!this.props.folder.images ? this.props.folder.images.length : null}</span>
          </div>
          {this.state.showEdit ?
            <FormGroup>
              <InputGroup>
                <FormControl type="text" name="name" value={this.state.name} onChange={this.handleFieldChange.bind(this)} placeholder="New Folder Name"/>
                <InputGroup.Button>
                  <Button bsStyle="info" onClick={() => {this.props.updateFolder(this.props.folder.id, this.state.name); this.setState({name: ""})}}>Save</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup> : null
          }
          <div className="folder-details-btn">
            <Button bsStyle="primary" bsSize="small" onClick={() => {this.props.openFolder(this.props.folder.id); this.props.closeFolderInfo()}}>Open</Button>
            <Button bsStyle="info" bsSize="small" onClick={this.toggleEdit.bind(this)}>Change Name</Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => {this.props.deleteFolder(this.props.folder.id); this.props.closeFolderInfo()}}>Delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

FolderInfoModal.proptypes = {
  folderInfoModalShow: PropTypes.bool,
  closeFolderInfo: PropTypes.func,
  openFolder: PropTypes.func,
  deleteFolder: PropTypes.func,
  folder: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    folderInfoModalShow: state.modalShow.folderInfoModalShow,
    folder: state.modalShow.currentInfoFolder,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    closeFolderInfo: () => dispatch(FolderInfoActionCreator.closeFolderInfo()),
    openFolder: (id) => dispatch(DataActionCreator.showFolder(id)),
    updateFolder: (id, name) => dispatch(DataActionCreator.updateFolder(id, name)),
    deleteFolder: (id) => dispatch(DataActionCreator.deleteFolder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderInfoModal);
