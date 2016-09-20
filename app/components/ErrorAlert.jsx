import React, {Component, PropTypes} from 'react';
import {Alert} from 'react-bootstrap';

class ErrorAlert extends Component {
  constructor() {
    super();
    this.state = {
      isVisble: true
    }
  }
  handleDismiss() {
    this.setState({isVisble: false});
  }
  render() {
    return (
      this.state.isVisble
        ? <Alert
            bsStyle="danger"
            onDismiss={this.handleDismiss.bind(this)}>
            {this.props.children}
          </Alert>
        : null
    )
  }
}

export default ErrorAlert;
