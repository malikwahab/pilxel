import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  Button
} from 'react-bootstrap';
import {LandingActionCreator} from '../actions/LandingActions';
import AuthenticationActionCreator from '../actions/AuthenticationActionCreator';

class SignUp extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }
  }

  handleFieldChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    this.setState({[key]: value});
  }

  render() {
    return (
      <Form action="post">
        <FormGroup controlId="formControlsText">
          <FormControl
            type="text"
            required={true}
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleFieldChange.bind(this)}/>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <FormControl
            type="text"
            required={true}
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleFieldChange.bind(this)}/>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <FormControl
            type="password"
            required={true}
            placeholder="Password"
            name="password1"
            value={this.state.password1}
            onChange={this.handleFieldChange.bind(this)}/>
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <FormControl
            type="password"
            required={true}
            placeholder="Conform Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleFieldChange.bind(this)}/>
        </FormGroup>
        <a className="btn pilxel-button" onClick={this.props.onSubmit.bind(null, this.state)}>Sign Up</a>
        <a className="pilxel-button btn" onClick={this.props.hideSignUp}>
          Cancel Sign Up
        </a>
      </Form>
    )
  }
}

SignUp.propTypes = {
  hideSignUp: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSignUp: () => dispatch(LandingActionCreator.toggleSignUp()),
    onSubmit: (credentials) => dispatch(AuthenticationActionCreator.signUp(credentials))
  };
}

export default connect(null, mapDispatchToProps)(SignUp);
