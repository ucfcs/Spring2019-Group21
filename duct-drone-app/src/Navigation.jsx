import React from 'react';
import Nav from 'react-bootstrap/Nav'
// import './Navigation.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
class Navigation extends React.Component {
  // state = {
  //   activeComponent: 'Control',
  // }
  updateActiveComponent = (activeComponent) => {
    this.setState({ ...activeComponent })
  }
  render() {
    return (
    <div className="d-flex flex-column">
      <ButtonGroup size="lg">
        <IndexLinkContainer to="/"><Button >Control</Button></IndexLinkContainer>
        <LinkContainer to="/data/"><Button >Data</Button></LinkContainer>
        <LinkContainer to="/logs/"><Button >Logs</Button></LinkContainer>
      </ButtonGroup>
    </div>
    );
  }
}

export default Navigation;
