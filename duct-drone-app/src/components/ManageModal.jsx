import React, { Component } from 'react';
import {
  Modal, Button, Row, Col, Container, ListGroup,
} from 'react-bootstrap';
import SessionTable from './SessionTable';
import './styles/ManageModal.css';

class ManageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSession: '',
    };
  }

  setActiveSession = (session) => {
    this.setState({ activeSession: session });
  }

  clearSession = () => {
    this.setState({ activeSession: '' });
  }

  deleteSession = () => {
    const { getData, serverIP } = this.props;
    const { activeSession } = this.state;
    fetch(`http://${serverIP}/api/remove/${activeSession._id}`, {
      method: 'DELETE',
    });
    getData();
    this.clearSession();
  }

  deleteAll = () => {
    const { getData } = this.props;
    fetch(`http://${serverIP}/api/removeall`, {
      method: 'DELETE',
    });
    getData();
    this.clearSession();
  }


  render() {
    const { manageModalOpen, closeModal, data } = this.props;
    const { activeSession } = this.state;
    const sessionListData = Object.values(data);
    const list = [];
    sessionListData.forEach(session => list.push(<ListGroup.Item action={true} active={session._id === activeSession._id} onClick={() => this.setActiveSession(session)}>{`${session.name}`}</ListGroup.Item>)
    );
    return (
      <Modal show={manageModalOpen} size="lg">
        <Modal.Header>Manage Sessions</Modal.Header>
        <Modal.Body>
          <Container fluid={true}>
            <Row>
              <Col xs={3}>
                <ListGroup />
                {list}
              </Col>
              <Col xs={1}>
                <Button variant="outline-danger" onClick={this.deleteSession}>&#128465;</Button>
                <Button variant="danger" onClick={this.deleteAll}>Delete All</Button>
                {activeSession.map_link != '' ? <a href={activeSession.map_link} target="_blank">Map Download Link</a> : null}
              </Col>
              <Col>
                <SessionTable data={activeSession ? activeSession.sensorData : []} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer><Button variant="danger" onClick={closeModal}>Exit Modal</Button></Modal.Footer>
      </Modal>
    );
  }
}
export default ManageModal;
