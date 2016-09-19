import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  Button
} from 'react-bootstrap';
import {LandingActionCreator} from '../actions/LandingActions';
import {connect} from 'react-redux';
import AuthenticationActionCreator from '../actions/AuthenticationActionCreator';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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
      <Form action="post" onSubmit={this.props.onSubmit.bind(null, this.state)}>
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
            type="password"
            required={true}
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleFieldChange.bind(this)}/>
        </FormGroup>
        <a className="btn pilxel-button" onClick={this.props.onSubmit.bind(null, this.state)}>Login</a>
        <a className="pilxel-button btn" onClick={this.props.hideLogin}>
          Cancel Login
        </a>
      </Form>
    )
  }
}

Login.propTypes = {
  hideLogin: PropTypes.func,
  onSubmit: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideLogin: () => dispatch(LandingActionCreator.toggleLogin()),
    onSubmit: (credentials) => dispatch(AuthenticationActionCreator.login(credentials))
  }
}

export default connect(null, mapDispatchToProps)(Login);
