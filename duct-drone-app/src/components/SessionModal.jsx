import React, {Component} from 'react';
import {
    Modal, Form, Row, Col, Container, Button,
  } from 'react-bootstrap';

class SessionModal extends Component {
    constructor(props) {
        super();
        this.state = {
            sessionName: '',
        };
        
    }
    
    startSession = () => {
        const { updateSessionName, updateSessionID, serverIP, closeModal } = this.props;
        updateSessionName(this.state.sessionName);
        const data = {
            name: this.state.sessionName,
            map_link: "",
            sensorData: [],
        }
        fetch('http://'+serverIP + '/api/create/map',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then((data) => {
          updateSessionID(data.id);
          console.log("Create map with ID: " + data.id);
          closeModal();
        });
        

    }
    handleChange = (e) => {
        this.setState({ sessionName: e.target.value });
    }
    render() {
        const { sessionName, sessionID, sessionModalOpen, updateSessionName, closeModal } = this.props;
        return (
        <Modal show={ sessionModalOpen }>
            <Modal.Header>Session Start</Modal.Header>
            <Modal.Body>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Session Name</Form.Label>
                                    <Form.Control onChange={this.handleChange}/>
                                    <Form.Text>Enter the desired Session Start Name</Form.Text>
                                </Form.Group>
                            </Form>
                            <Button variant="success" onClick={this.startSession}>Start Session</Button>

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer><Button variant="danger" onClick={closeModal}>Exit Modal</Button></Modal.Footer>
        </Modal>
        );

    }

}
export default SessionModal;