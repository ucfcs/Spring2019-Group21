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

  setActiveSession = (id) => {
    this.setState({ activeSession: id });
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
