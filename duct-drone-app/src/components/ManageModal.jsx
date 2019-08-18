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
    const { getData } = this.props;
    const { activeSession } = this.state;
    fetch(`http://localhost:5000/api/remove/${activeSession._id}`, {
      method: 'DELETE',
    });
    getData();
    this.clearSession();
  }

  deleteAll = () => {
    const { getData } = this.props;
    fetch('http://localhost:5000/api/removeall', {
      method: 'DELETE',
    });
    getData();
    this.clearSession();
  }


  render() {
    const { modalOpen, closeModal, data } = this.props;
    const { activeSession } = this.state;
    const sessionListData = Object.values(data);
    const list = [];
    sessionListData.forEach(session => list.push(<ListGroup.Item action={true} active={session._id === activeSession._id} onClick={() => this.setActiveSession(session)}>{`${session.name} ${session._id}`}</ListGroup.Item>)
    );
    return (
      <Modal show={modalOpen} size="lg">
        <Modal.Header>Manage Sessions</Modal.Header>
        <Modal.Body>
          <Container fluid={true}>
            <Row>
              <Col>
                <ListGroup />
                {list}
              </Col>
              <Col xs={1}>
                <Button variant="outline-danger" onClick={this.deleteSession}>&#128465;</Button>
                <Button variant="danger" onClick={this.deleteAll}>Delete All</Button>
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
