import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Navigation.css';
class Navigation extends React.Component {
  render() {
    return (
      <Nav fill variant="pills" defaultActiveKey="/home" fixed='bottom'>
        <Nav.Item>
          <Nav.Link href="/home">Control</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Data</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Logs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">View Map</Nav.Link>
        </Nav.Item>
      </Nav>
)
  }
}

export default Navigation;