import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Navigation.css';
class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
        <Navbar.Brand href="#home">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Control</Nav.Link>
            <Nav.Link href="#pricing">Data</Nav.Link>
            <Nav.Link href="#pricing">Logs</Nav.Link>
            <Nav.Link href="#pricing">View Mapping</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
)
  }
}

export default Navigation;