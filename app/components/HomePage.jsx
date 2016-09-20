import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../Store/AppStore';
import LandingButton from './LandingButton';
import SignUp from './SignUp';
import Login from './Login';
import ErrorAlert from './ErrorAlert';

class HomePage extends Component {

  render() {
    return (
      <Grid className="landing-container">
        <Row className="show-grid landing">
          <span className="logo"/>
          {this.props.authenticatError == "LOGIN" ? <ErrorAlert>Login failed. Check Username and Password</ErrorAlert> : null}
          {this.props.authenticatError == "SIGNUP" ? <ErrorAlert>Unable to Sign you up, Try Again</ErrorAlert> : null}
          {this.props.authenticatError == "FACEBOOK_LOGIN" ? <ErrorAlert>Login with facebook failed</ErrorAlert> : null}
          { this.props.LandingButtonShow ? <LandingButton />: null}
          { this.props.loginShow ? <Login /> : null }
          { this.props.signUpShow ? <SignUp />: null }
        </Row>
      </Grid>
    )
  }
}

HomePage.propTypes = {
    loginShow: PropTypes.bool,
    LandingButtonShow: PropTypes.bool,
    authenticatError: PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        loginShow: state.showLogin.loginShow,
        LandingButtonShow: state.showLogin.LandingButtonShow,
        signUpShow: state.showLogin.signUpShow,
        authenticatError: state.authenticate.authenticatError
    }
}

export default connect(mapStateToProps, null)(HomePage);
