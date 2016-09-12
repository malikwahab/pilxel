import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import PhotoEditor from './PhotoEditor'

class Pilxel extends Component {

  render(){
      return (
        <div>
          { this.props.isAuthenticated? <PhotoEditor /> : <HomePage /> }
        </div>
      )
  }
}

Pilxel.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authenticate.isAuthenticated
    }
}

export default connect(mapStateToProps)(Pilxel);
