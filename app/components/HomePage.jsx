import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../Store/AppStore';
import LandingButton from './LandingButton';
import SignUp from './SignUp';
import Login from './Login';

class HomePage extends Component {

  render() {
    return (
      <Grid className="landing-container">
        <Row className="show-grid landing">
          <span className="logo"/>
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
    LandingButtonShow: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        loginShow: state.showLogin.loginShow,
        LandingButtonShow: state.showLogin.LandingButtonShow,
        signUpShow: state.showLogin.signUpShow
    }
}

export default connect(mapStateToProps, null)(HomePage);
