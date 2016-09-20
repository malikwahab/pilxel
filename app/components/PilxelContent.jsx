import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageContainer from './ImageContainer';
import ImageInfoModal from './ImageInfoModal';
import ImageEditorModal from './ImageEditorModal';
import FolderInfoModal from './FolderInfoModal';
import UploadModal from './UploadModal';
import Folder from './Folder';
import ImageUploadActionCreator from '../actions/ImageUploadActionCreator';
import FolderInfoActionCreator from '../actions/FolderInfoActionCreator';
import DataActionCreator from '../actions/DataActionCreator';
import { connect } from 'react-redux';

class PilxelContent extends Component {
  componentDidMount(){
    this.props.fetchImages();
    this.props.fetchFolders();
  }
  render() {
    return (
      <Grid fluid className="page-content-wrapper">
        <Row className="show-grid">
          {this.props.isRootFolder ? this.props.folders.map((folder, i) => {
              return(<Folder key={i} name={folder.name} open={this.props.showFolderInfo.bind(null, folder)}/>)
          }) : null }
          {this.props.images.map((image, i) => {
              if(image.folder == this.props.displayedImageFolder){
                return(<ImageContainer key={i} id={image.id}/>)
              }
          })}
        </Row>
        <ImageInfoModal />
        <ImageEditorModal />
        <FolderInfoModal />
        <UploadModal />
        <a className="add-image" onClick={this.props.showUploadModal}><i className="material-icons">add_a_photo</i></a>
      </Grid>
    )
  }
}

PilxelContent.proptypes = {
  displayedImageFolder: PropTypes.number,
  isRootFolder: PropTypes.bool,
  showUploadModal: PropTypes.func,
  fetchImages: PropTypes.func,
  fetchFolders: PropTypes.func,
}
const mapStateToProps = (state) => {
  return {
    images: state.data.images,
    folders: state.data.folders,
    displayedImageFolder: state.data.displayedImageFolder,
    isRootFolder: state.data.isRootFolder
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showUploadModal: () => dispatch(ImageUploadActionCreator.toggleUploadModal()),
    fetchImages: () => dispatch(DataActionCreator.fetchImages()),
    fetchFolders: () => dispatch(DataActionCreator.fetchFolders()),
    showFolderInfo: (folder) => dispatch(FolderInfoActionCreator.showFolderInfo(folder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PilxelContent);
