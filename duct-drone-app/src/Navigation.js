import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Navigation.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Navigation extends React.Component {
  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
  }
  render() {
    return (

              <Nav fill variant="pills" defaultActiveKey="1" onSelect={k => this.handleSelect(k)} fixed='bottom'>
                <Nav.Item>
                    <Link to="/">Control</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/data/">Data</Link>
                </Nav.Item> 
                <Nav.Item>
                  Logs
                </Nav.Item>
                <Nav.Item>
                  View Map
                </Nav.Item>
              </Nav>
    )
  }
}

export default Navigation;