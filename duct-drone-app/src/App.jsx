import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Button, ButtonToolbar, Row, Col,
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LiveBar from './components/LiveBar';
import ManageModal from './components/ManageModal';
import SessionTable from './components/SessionTable';
import './components/styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: '0',
      currentAirVelocity: '0',
      logData: [],
      modalOpen: false,
      sessionID: '',
    };
    this.keyRecord = this.keyRecord.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyRecord, false);
    this.getData();
  }


  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyRecord, false);
  }

  getData = () => {
    fetch('http://54.243.15.216:5000/api/get/maps',
      {
        method: 'GET',
      })
      .then(response => response.json())
      .then((data) => {
        this.setState({ logData: data });
      });
  }

  keyRecord = (event) => {
    // console.log(event.key);
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    Number.prototype.pad = function (size) {
      let s = String(this);
      while (s.length < (size || 2)) { s = `0${s}`; }
      return s;
    };
    const {
      logData, currentTemp, currentAirVelocity, sessionID,
    } = this.state;
    const { modalOpen } = this.state;

    return (
      <div onKeyPress={e => console.log(e.key)} className="background">
        <Router>
          <Container fluid={true} style={{ height: '100%' }}>
            <ManageModal modalOpen={modalOpen} closeModal={this.closeModal} data={logData.length != 0 ? logData : []} getData={this.getData} />
            <Row style={{ height: '100%' }}>
              <Col>
                <Sidebar openModal={this.openModal} />
              </Col>
              <Col xs={8}>
                <Container fluid={true}>
                  <ButtonToolbar>
                    <Row style={{ width: '100%' }}>
                      <Col>
                        <Button variant={sessionID ? 'success' : 'warning'} size="lg">
                            Drone Status:
                          {' '}
                          {sessionID ? 'Connected' : 'Disconnected'}
                        </Button>
                      </Col>
                      <Col xs={7}>
                        <Button variant={sessionID ? 'success' : 'warning'} className="btn-display" disabled={true} size="lg">
                          {sessionID ? "Session ID: MSB Men's Bathroom" : 'Inactive'}
                        </Button>
                      </Col>
                    </Row>
                  </ButtonToolbar>

                </Container>
                <Container fluid={true}>
                  <div id="feed" />
                  <SessionTable data={logData.length ? logData[0].sensorData : []} />
                </Container>
              </Col>
              <Col>
                <LiveBar currentAirVelocity={currentAirVelocity} currentTemp={currentTemp} />
              </Col>
            </Row>
          </Container>
        </Router>
      </div>

    );
  }
}
export default App;
