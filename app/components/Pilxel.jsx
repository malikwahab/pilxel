import React, { Component, PropTypes } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import PhotoEditor from './PhotoEditor';
import AuthenticationActionCreator from '../actions/AuthenticationActionCreator';

class Pilxel extends Component {
  componentWillMount(){
    this.props.checkLoginStatus();
  }
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

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoginStatus: () => dispatch(AuthenticationActionCreator.checkLoginStatus())
  }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authenticate.isAuthenticated
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pilxel);
