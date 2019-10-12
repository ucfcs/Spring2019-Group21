import React, { Component } from 'react';
import {
  Container, Button, Row, InputGroup, FormControl
} from 'react-bootstrap';
import './styles/Sidebar.css';

class Sidebar extends Component {

  render() {
    const { openModal, connectServer, connectROS, updateServerIP, updateROSIP } = this.props;
    return (
      <Container>
        <Row style={{ height: '30%' }} />
        <Row>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="ROS IP"
              aria-label="ROS IP"
              aria-describedby="basic-addon2"
              onChange={updateROSIP}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={connectROS}>Connect</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Server IP"
              aria-label="Server IP"
              aria-describedby="basic-addon2"
              onChange={updateServerIP}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={connectServer}>Connect</Button>
            </InputGroup.Append>
          </InputGroup>      
        </Row>
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
