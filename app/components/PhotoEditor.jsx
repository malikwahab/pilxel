import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';


class PhotoEditor extends Component {
    render(){
        return (
            <Grid>
                <Row className="show-grid" >
                    <h1> PhotoEditor </h1>
                </Row>
            </Grid>
        )
    }
}

export default PhotoEditor;
