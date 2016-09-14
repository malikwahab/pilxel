import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';


class SideBar extends Component {

  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-title">
            <a href="#" className="active">
              <span className="link-text">Root</span> <Glyphicon glyph="triangle-bottom" />
            </a>
          </li>
          <li>
            <a href="#"><span className="link-text">Adventure</span> <Glyphicon glyph="folder-close" /> </a>
          </li>
          <li>
            <a href="#"><span className="link-text">Sport</span> <Glyphicon glyph="folder-close" /></a>
          </li>
          <li>
            <a href="#"><span className="link-text">Selfies</span> <Glyphicon glyph="folder-close" /></a>
          </li>
          <li>
            <a href="#"><span className="link-text">Travel</span> <Glyphicon glyph="folder-close" /></a>
          </li>
          <li>
            <a href="#"><span className="link-text">Add New</span> <Glyphicon glyph="plus" /> </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideBar;
