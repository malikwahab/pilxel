import { SHOW_FOLDER_INFO, CLOSE_FOLDER_INFO } from '../constants';

const FolderInfoActionCreator = {
  showFolderInfo(folder){
    return {
      type: SHOW_FOLDER_INFO,
      folder
    };
  },
  closeFolderInfo(){
    return {
      type: CLOSE_FOLDER_INFO
    };
  }
};

export default FolderInfoActionCreator;
