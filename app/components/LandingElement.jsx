import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LandingActionCreator } from '../actions/LandingActions';
import { Row } from 'react-bootstrap';



class LandingElement extends Component {

    render(){
        return (
            <Row className="show-grid">
            <span className="logo"/>
            <div className="landing-button-container">
              <a className="pilxel-button btn" onClick={this.props.showLogin}>
                Login
              </a>
              <a className="pilxel-button btn">
                Sign Up
              </a>
              <a className="pilxel-button btn">
                Login with Facebook
              </a>
            </div>
            </Row>
        )
    }
}


LandingElement.propTypes = {
    showLogin: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLogin: () => dispatch(LandingActionCreator.toggleLogin())
    };
}


const LandingElementContainer = connect(null, mapDispatchToProps)(LandingElement);

export default LandingElementContainer;
