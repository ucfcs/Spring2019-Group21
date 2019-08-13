import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';
import './Navigation.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Navigation extends React.Component {
  state = {
    activeComponent: 'Control',
  }
  updateActiveComponent = (activeComponent) => {
    this.setState({ ...activeComponent })
  }
  testIt = () => {
    console.log('yeet');
  }
  render() {
    return (
      <Nav fill variant="pills" defaultActiveKey="1" onSelect={this.testIt} fixed="bottom">
        <Nav.Item>
          <Link to="/">Control</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/data/">Data</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/logs/">Logs</Link>
        </Nav.Item>
        <Nav.Item>
          View Map
        </Nav.Item>
      </Nav>
    );
  }
}

export default Navigation;
