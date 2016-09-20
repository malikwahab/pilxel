import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';

class Folder extends Component {
  render(){
    return(
      <Col md={3} sm={4}>
      <div className="folder" onClick={this.props.open}>
       <i className="material-icons">folder</i>
       <span className="folder-name">{this.props.name}</span>
      </div>
      </Col>
    )
  }
}

Folder.proptypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  open: PropTypes.func
}

export default Folder;
