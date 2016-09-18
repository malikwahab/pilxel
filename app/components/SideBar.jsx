import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import DataActionCreator from '../actions/DataActionCreator';
import {connect} from 'react-redux';

class SideBar extends Component {

  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-title">
            <a href="#"
               className={this.props.displayedImageFolder == null? "active": ""}
               onClick={this.props.showFolder.bind(null, null)}>
                <span className="link-text">Root</span>
                <Glyphicon glyph="triangle-bottom"/>
            </a>
          </li>
          {this.props.folders.map((folder, i) => {
              return (
                <li key={i}>
                  <a href="#"
                     className={this.props.displayedImageFolder == folder.id ? "active" : ""}
                     onClick={this.props.showFolder.bind(null, folder.id)}>
                       <span className="link-text">{folder.name}</span>
                       <i className="material-icons">folder</i>
                  </a>
                </li>
              )
            })}
          <li>
            <a href="#">
              <span className="link-text">Add New</span>
              <i className="material-icons">create_new_folder</i>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

SideBar.props = {
  folders: PropTypes.object,
  showFolder: PropTypes.func,
  displayedImageFolder: PropTypes.number
}

const mapStateToProps = (state) => {
  return {folders: state.data.folders, displayedImageFolder: state.data.displayedImageFolder}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showFolder: (id) => dispatch(DataActionCreator.showFolder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
