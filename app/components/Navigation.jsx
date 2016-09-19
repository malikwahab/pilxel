import React, { Component, PropTypes} from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthenticationActionCreator from '../actions/AuthenticationActionCreator';

class Navigation extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">PilXel</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={this.props.username} id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} onClick={this.props.logout}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Navigation.proptypes = {
  logout: PropTypes.func,
  username: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    username: state.authenticate.userData.username
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthenticationActionCreator.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
