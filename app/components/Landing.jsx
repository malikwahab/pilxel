import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import LoginContainer from './Login';
import { connect } from 'react-redux';
import store from '../Store/AppStore';
import LandingElementContainer from './LandingElement'

class Landing extends Component {

  render() {
    return (
      <Grid className="landing-container">
        <div className="landing" >
          { this.props.langingElementShow ? <LandingElementContainer />: null}
          { this.props.loginShow ? <LoginContainer /> : null }
        </div>
      </Grid>
    )
  }
}

Landing.propTypes = {
    loginShow: PropTypes.bool,
}

const mapStateToProps = (state) => {
    return {
        loginShow: state.loginShow,
        langingElementShow: state.langingElementShow
    }
}

const LandingApp = connect(mapStateToProps, null)(Landing);
export default LandingApp;
