import React, { Component } from 'react';
import {
  Container, Button, Row,
} from 'react-bootstrap';
import './styles/Sidebar.css';

class Sidebar extends Component {
  state = {
    autonomous: false,
  };

  render() {
    const { openModal } = this.props;
    return (
      <Container>
        <Row style={{ height: '30%' }} />
        <Row>
          <Button size="lg" variant="outline-primary" block={true}>Start Session</Button>
        </Row>
        <Row style={{ height: '2%' }} />
        <Row>
          <Button size="lg" variant="outline-primary" block={true}>Autonomous</Button>
        </Row>
        <Row style={{ height: '30%' }} />
        <Row>
          <Button size="lg" variant="outline-info" block={true} onClick={openModal}>Manage Sessions</Button>
        </Row>
      </Container>

    );
  }
}
export default Sidebar;
