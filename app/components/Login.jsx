import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import { LandingActionCreator } from '../actions/LandingActions';
import { connect } from 'react-redux';


class Login extends Component {
  constructor(){
      super();
      this.state = {
          name: "",
          password: ""
      }
  }
  render() {
    return (
    <Form action="post">
      <FormGroup controlId="formControlsText">
        <Col sm={10}>
          <FormControl
            type="text"
            required={true}
            placeholder="Username"
            name="name"
            value={this.state.name}
            onChange={this.handleFieldChange}/>
        </Col>
      </FormGroup>

      <FormGroup controlId="formControlsText">
        <Col sm={10}>
          <FormControl
            type="password"
            required={true}
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleFieldChange}/>
        </Col>
      </FormGroup>
      <Button type="submit" id="contact" type="submit" className="btn pilxel-button">Send Message</Button>
      <a className="pilxel-button btn" onClick={this.props.hideLogin}>
        Cancel Login
      </a>
    </Form>
    )
  }
}

Login.propTypes = {
    hideLogin: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideLogin: () => dispatch(LandingActionCreator.toggleLogin())
    }
}

const LoginContainer = connect(null, mapDispatchToProps)(Login);
export default LoginContainer;
