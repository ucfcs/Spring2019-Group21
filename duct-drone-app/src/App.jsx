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
var ROSLIB = require('roslib');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: '0',
      currentAirVelocity: '0',
      logData: [],
      modalOpen: false,
      sessionID: '',
      ros: new ROSLIB.Ros
        ({
          url : 'ws://localhost:9090'
        }),

      rightPressed: false,
      leftPressed: false,
      upPressed: false,
      downPressed:false,
      linear: {
        x : 0.0,
        y : 0.0,
        z : 0.0
      }
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
    this.getData();
  }


  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
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

  keyDownHandler = (event) => {
    console.log(event.key);
    if(event.keyCode == 68) {
        this.setState({rightPressed: true})
        this.move (   0, 100);
    }
    else if(event.keyCode == 65) {
      this.setState({leftPressed: true})
      this.move (   0,-100);
    }
    if(event.keyCode == 83) {
      this.setState({downPressed: true})
      this.move (-100,   0);
    }
    else if(event.keyCode == 87) {
      this.setState({upPressed: true})
      this.move ( 100,   0);
    }
}

keyUpHandler = (event) => {
    console.log(event.key);
    if(event.keyCode == 68) {
      this.setState({rightPressed: false})
      this.move (   0,0);
  }
  else if(event.keyCode == 65) {
    this.setState({leftPressed: false})
    this.move (   0,0);
  }
  if(event.keyCode == 83) {
    this.setState({downPressed: false})
    this.move (   0,0);
  }
  else if(event.keyCode == 87) {
    this.setState({upPressed: false})
    this.move (   0,0);
  }
}

  openModal = () => {
    this.setState({ modalOpen: true });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  move = (linearx, rotatez) =>
  {
    // Create the velocity command
    var cmdVel = new ROSLIB.Topic
    ({
      ros : this.state.ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    // Create the twist message
    var twist = new ROSLIB.Message
    ({
      linear : 
      {
        x : linearx / 50,
        y : 0.0,
        z : 0.0
      },
      angular : 
      {
        x : 0.0,
        y : 0.0,
        z : -rotatez / 20
      }
    });
    console.log("publish");
    // Publishing the twist message
    cmdVel.publish(twist);
  }
  render() {

    let { ros } = this.state;
    ros.on('connection', function() {
      console.log('Connected to websocket server.');
    });
  
    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });
  
    ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });

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
