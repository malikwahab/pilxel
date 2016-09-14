import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import PilxelContent from './PilxelContent';
import Navigation from './Navigation';


class PhotoEditor extends Component {
    render(){
        return (
            <div>
                <Navigation />
                <SideBar />
                <PilxelContent />
            </div>
        )
    }
}

export default PhotoEditor;
