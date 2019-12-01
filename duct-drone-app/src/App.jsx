import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Button, ButtonToolbar, Row, Col, Image,
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import SessionModal from './components/SessionModal';
import Sidebar from './components/Sidebar';
import LiveBar from './components/LiveBar';
import ManageModal from './components/ManageModal';
import SessionTable from './components/SessionTable';
import './components/styles/App.css';


const ROSLIB = require('roslib');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leakAlertVal: 0,
      showSessionTable: false,
      keyFired: false,
      currentTemp: '0',
      currentHumidity: '0',
      logData: [],
      manageModalOpen: false,
      sessionID: '',
      sessionName: '',
      sessionModalOpen: false,
      rosConnected: false,
      ros: '',
      listener: '',
      ROSIP: '192.168.137.2',
      serverIP: '34.192.197.226:5000',
      serverConnected: false,
      threshold: 0,
      serialTableData: {},
    };
  }

  componentDidMount() {
    // if(this.state.rosConnected) {
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
    this.connectServer();
    this.connectROS();
    // }
  }

  componentWillUnmount() {
  }

  incrementThreshold = () => {
    this.setState({ threshold: this.state.threshold + 1 }, () => this.updateROSThreshold());
  }

  decrementThreshold = () => {
    const { threshold } = this.state;
    if (threshold > 0) { this.setState({ threshold: this.state.threshold - 1 }, () => this.updateROSThreshold()); }
  }

  getData = () => {
    fetch(`http://${this.state.serverIP}/api/get/maps`,
      {
        method: 'GET',
      })
      .then(response => response.json())
      .then((data) => {
        this.setState({ logData: data });
        let idList = {};
        idList = Object.keys(data).map(key => data[key]);
        const newIDList = {};
        idList.forEach((obj) => {
          const id = obj._id;
          newIDList[id] = obj;
        });
        this.setState({ serialTableData: newIDList });
      });
  }

  updateServerIP = (event) => {
    this.setState({ serverIP: event.target.value });
  }

  updateROSIP = (event) => {
    this.setState({ ROSIP: event.target.value });
  }

  updateSessionName = (name) => {
    this.setState({ sessionName: name });
  }

  updateSessionID = (id) => {
    this.setState({ sessionID: id });
  }

  connectServer = () => {
    this.setState({ serverConnected: false });
    fetch(`http://${this.state.serverIP}/api/get/maps`,
      {
        method: 'GET',
      })
      .then((response) => {
        if (response.ok) {
          this.setState({ serverConnected: true });
          this.getData();
        }
      });
    this.timerID = setInterval(

      () => {
        fetch(`http://${this.state.serverIP}/api/get/maps`,
          {
            method: 'GET',
          })
          .then((response) => {
            if (response.ok) {
              this.setState({ serverConnected: true });
              this.getData();
              if (this.state.sessionID != '' && this.state.serialTableData[this.state.sessionID] != null) { this.setState({ showSessionTable: true }); }
            }
          });
      },
      5000
    );
  }

  connectROS = () => {
    let rosSession = {};
    rosSession = new ROSLIB.Ros({
      url: `ws://${this.state.ROSIP}:9090`,
    });
    this.setState({ ros: rosSession });
    const HumidityListener = new ROSLIB.Topic({
      ros: rosSession,
      name: '/humidity_data',
      messageType: 'std_msgs/Float32MultiArray',
    });
    const leakListener = new ROSLIB.Topic({
      ros: rosSession,
      name: '/leak_detected',
      messageType: 'std_msgs/Int32',
    });

    leakListener.subscribe((message) => {
      this.setState({ leakAlertVal: message.data });
    });
    HumidityListener.subscribe((message) => {
      this.setState({ currentTemp: Math.round(message.data[0] * 10) / 10 });
      this.setState({ currentHumidity: Math.round(message.data[1] * 10) / 10 });
      const { sessionID } = this.state;
      const data = {
        temperature: this.state.currentTemp,
        humidity: this.state.currentHumidity,
      };
      fetch(`http://${this.state.serverIP}/api/update/map/${sessionID}/sensordata`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    });
  }

  updateROSThreshold = () => {
    // Create the velocity command
    const cmdThreshold = new ROSLIB.Topic({
      ros: this.state.ros,
      name: '/leak_threshold',
      messageType: 'std_msgs/Int32',
    });

    // Create the twist message
    const thresholdMsg = new ROSLIB.Message({
      data: this.state.threshold,
    });
    // Publishing the twist message
    cmdThreshold.publish(thresholdMsg);
  }

  keyDownHandler = (event) => {
    if (!this.state.keyFired) {
      this.setState({ keyFired: true });
      if (event.keyCode == 82) { //  r key
        this.move(0, -1, 0);
      } else if (event.keyCode == 70) { // f key
        this.move(0, 1, 0);
      } else if (event.keyCode == 68) {
        this.move(0, 0, -0.5);
      } else if (event.keyCode == 65) {
        this.move(0, 0, 0.5);
      } else if (event.keyCode == 83) {
        this.move(-0.15, 0, 0);
      } else if (event.keyCode == 87) {
        this.move(0.15, 0, 0);
      }
    }
  }

keyUpHandler = (event) => {
  this.setState({ keyFired: false });
  if (event.keyCode == 82) {
    this.move(0, 0, 0);
  } else if (event.keyCode == 70) { //  f key
    this.move(0, 0, 0);
  } else if (event.keyCode == 68) {
    this.move(0, 0, 0);
  } else if (event.keyCode == 65) {
    this.move(0, 0, 0);
  }
  if (event.keyCode == 83) {
    this.move(0, 0, 0);
  } else if (event.keyCode == 87) {
    this.move(0, 0, 0);
  }
}

  openManageModal = () => {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.removeEventListener('keyup', this.keyUpHandler, false);
    this.setState({ manageModalOpen: true });
  }

  openSessionModal = () => {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.removeEventListener('keyup', this.keyUpHandler, false);
    this.setState({ sessionModalOpen: true });
  }

  endSession = () => {
    this.setState({ sessionName: '' });
    this.setState({ sessionID: '' });
    this.setState({ showSessionTable: false });
    this.sendROSStopMsg();
  }

  closeModal = () => {
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
    this.setState({ manageModalOpen: false });
    this.setState({ sessionModalOpen: false });
  }


  move = (linearx, rotatey, rotatez) => {
    // Create the velocity command
    const cmdVel = new ROSLIB.Topic({
      ros: this.state.ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist',
    });

    // Create the twist message
    const twist = new ROSLIB.Message({
      linear:
      {
        x: linearx,
        y: 0.0,
        z: 0.0,
      },
      angular:
      {
        x: 0.0,
        y: rotatey,
        z: rotatez,
      },
    });
    // Publishing the twist message
    cmdVel.publish(twist);
  }

  sendROSStartMsg = () => {
    const cmdSession = new ROSLIB.Topic({
      ros: this.state.ros,
      name: '/session',
      messageType: 'std_msgs/String',
    });
      // Start a new session
    const sessionMsg = new ROSLIB.Message({
      data: 'start',
    });
    cmdSession.publish(sessionMsg);
  }

  sendROSStopMsg = () => {
    const cmdSession = new ROSLIB.Topic({
      ros: this.state.ros,
      name: '/session',
      messageType: 'std_msgs/String',
    });
    const sessionMsg = new ROSLIB.Message({
      data: this.state.sessionID,
    });
    cmdSession.publish(sessionMsg);
  }

  render() {
    Number.prototype.pad = function (size) {
      let s = String(this);
      while (s.length < (size || 2)) { s = `0${s}`; }
      return s;
    };
    const {
      logData, currentTemp, currentHumidity, sessionID, rosConnected, sessionName, serverIP,
      serialTableData,
    } = this.state;
    const {
      threshold, manageModalOpen, sessionModalOpen, leakAlertVal,
    } = this.state;
    return (
      <div>
        <Router>
          <Container fluid={true} style={{ height: '100%' }}>
            <ManageModal manageModalOpen={manageModalOpen} serverIP={this.state.serverIP} closeModal={this.closeModal} data={logData.length != 0 ? logData : []} getData={this.getData} />
            <SessionModal
              sendROSStartMsg={this.sendROSStartMsg}
              sessionModalOpen={sessionModalOpen}
              closeModal={this.closeModal}
              updateSessionName={this.updateSessionName}
              updateSessionID={this.updateSessionID}
              sessionID={sessionID}
              serverIP={serverIP}
            />
            <Row style={{ height: '100%' }}>
              <Col>
                <Sidebar
                  endSession={this.endSession}
                  sessionName={sessionName}
                  openSessionModal={this.openSessionModal}
                  openManageModal={this.openManageModal}
                  rosConnected={this.state.rosConnected}
                  serverConnected={this.state.serverConnected}
                  connectServer={this.connectServer}
                  connectROS={this.connectROS}
                  updateROSIP={this.updateROSIP}
                  updateServerIP={this.updateServerIP}
                />
              </Col>
              <Col xs={8}>
                <Container fluid={true}>
                  <ButtonToolbar>
                    <Row style={{ width: '100%' }}>
                      <Col>
                        <Button
                          variant={sessionID ? 'success' : 'warning'}
                          className="btn-display"
                          disabled={true}
                          size="lg"
                        >
                          {sessionID != '' ? sessionID : 'Session ID: Inactive'}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant={sessionName != '' ? 'success' : 'warning'}
                          className="btn-display"
                          disabled={true}
                          size="lg"
                        >
                          {sessionName !== '' ? sessionName : 'Session Name: Inactive'}
                        </Button>
                      </Col>
                    </Row>
                  </ButtonToolbar>
                </Container>
                <Row>
                  <Col />
                  <Col xs={10}>
                    <Container fluid={true}>
                      <Image
                        style={
                          {
                            minWidth: '70%',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }
                        }
                        fluid={true}
                        src={`http://${this.state.ROSIP}:8080` + '/stream?topic=/raspicam_node/image_raw&quality=100&invert=true'}
                        onError={(e) => {
                          e.target.addEventListener('error', null);
                          e.target.src = 'https://www.dropbox.com/s/x8mo37abp36h9rt/disconnected.png?raw=1';
                        }}
                        alt="Drone is disconnected or Camera is Malfunctioning"
                      />
                    </Container>

                  </Col>
                  <Col />
                </Row>
                <Row>
                  <Col xs={10}>
                    {this.state.showSessionTable ? <SessionTable data={(serialTableData[sessionID] != null) ? serialTableData[sessionID].sensorData : null} /> : null}
                  </Col>
                </Row>

              </Col>
              <Col>
                <LiveBar threshold={threshold} incrementThreshold={this.incrementThreshold} decrementThreshold={this.decrementThreshold} currentTemp={currentTemp} currentHumidity={currentHumidity} leakAlertVal={leakAlertVal} />
              </Col>
            </Row>
          </Container>
        </Router>
      </div>

    );
  }
}
export default App;
