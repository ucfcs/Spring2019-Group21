import React, { Component } from 'react';
import {
  Container, Button, Row, InputGroup, FormControl
} from 'react-bootstrap';
import './styles/Sidebar.css';

class Sidebar extends Component {

  render() {
    const { endSession, sessionName, openSessionModal, openManageModal, connectServer, connectROS, serverConnected, rosConnected, updateServerIP, updateROSIP } = this.props;
    return (
      <Container>
        <Row style={{ height: '8%' }}/>
        <Row>
              { (serverConnected)?
                <Button variant={"success"} onClick={connectServer} size="lg" block={true} disabled>Server Connected</Button>
              :
              <Button variant={"danger"} onClick={connectServer} size="lg" block={true}>Server Disconnected</Button>}
        </Row>
        <Row style={{ height: '20%' }}/>
        <Row>
          <Button
            size="lg"
            variant={(sessionName=='' ? "outline-primary": "outline-secondary")}
            block={true}
            onClick={(sessionName=='') ? openSessionModal : endSession}>
             { (sessionName == '') ? <>Start Session</> :  <>End Session</> }
          </Button>
        </Row>
        <Row style={{ height: '2%' }}/>
        <Row>
          <Button size="lg" variant="outline-info" block={true} onClick={openManageModal}>Manage Sessions</Button>
        </Row>
        <Row style={{ height: '30%' }}/>
        <Row><Button variant="info" href="https://docs.google.com/document/d/11errNr8UtBq0_NY9xp3lLwKfAiXiufe8YfU8_tcegPU/edit?usp=sharing" target="_blank">Operating Manual</Button>
          </Row>
      </Container>

    );
  }
}
export default Sidebar;
