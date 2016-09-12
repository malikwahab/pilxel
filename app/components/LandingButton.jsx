import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LandingActionCreator } from '../actions/LandingActions';
import { Row } from 'react-bootstrap';


class LandingButton extends Component {

    render(){
        return (
            <div className="landing-button-container">
              <a className="pilxel-button btn" onClick={this.props.showLogin}>
                Login
              </a>
              <a className="pilxel-button btn" onClick={this.props.signUpShow}>
                Sign Up
              </a>
              <a className="pilxel-button btn">
                Login with Facebook
              </a>
            </div>
        )
    }
}


LandingButton.propTypes = {
    showLogin: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLogin: () => dispatch(LandingActionCreator.toggleLogin()),
        signUpShow: () => dispatch(LandingActionCreator.toggleSignUp())
    };
}

export default connect(null, mapDispatchToProps)(LandingButton);
