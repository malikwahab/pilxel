import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import DataActionCreator from '../actions/DataActionCreator';
import {connect} from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class SideBar extends Component {

  constructor(){
    super();
    this.state ={
      name: "",
      showAddFolder: false
    };
  }

  handleFieldChange(event) {
     event.preventDefault();
     const key = event.target.name;
     const value = event.target.value;
     this.setState({
       [key]: value,
     });
   }

  toggleShowAddFolder() {
    this.setState({
      showAddFolder: !this.state.showAddFolder
    })
  }

  addFolder() {
    this.props.addFolder(this.state.name);
    this.toggleShowAddFolder();
  }

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
            })
          }
          <li >
          {this.state.showAddFolder ?
            <FormGroup className="new-folder-input">
              <FormControl type="text" name="name" value={this.state.name} onChange={this.handleFieldChange.bind(this)} placeholder="New Name"/>
              <span>
                <Button bsSize="xsmall" bsStyle="success" onClick={this.addFolder.bind(this)}>Add</Button>
                <Button bsSize="xsmall" onClick={this.toggleShowAddFolder.bind(this)}>Cancel</Button>
              </span>
            </FormGroup> : null }
          </li>
          <li>
            <a href="#" onClick={this.toggleShowAddFolder.bind(this)}>
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
    showFolder: (id) => dispatch(DataActionCreator.showFolder(id)),
    addFolder: (name) => dispatch(DataActionCreator.addFolder(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
