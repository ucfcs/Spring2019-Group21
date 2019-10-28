import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Button, ButtonToolbar, Row, Col, Form
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

var ROSLIB = require('roslib');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      keyFired: false,
      currentTemp: '0',
      currentAirVelocity: '0',
      logData: [],
      manageModalOpen: false,
      sessionID: '',
      sessionName: '',
      sessionModalOpen: false,
      rosConnected: false,
      ros: '',
      listener: '',
      // IR_DATA
      IRListener: '',
      ROSIP: '',
      serverIP: '',
      serverConnected: false,
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
    // if(this.state.rosConnected) {
      document.addEventListener('keydown', this.keyDownHandler, false);
      document.addEventListener('keyup', this.keyUpHandler, false);
    // }
    
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.addEventListener('keyup', this.keyUpHandler, false);
  }

  getData = () => {
    console.log("get");
    fetch('http://'+this.state.serverIP + '/api/get/maps',
      {
        method: 'GET',
      })
      .then(response => response.json())
      .then((data) => {
        this.setState({ logData: data });
      });
  }
  updateServerIP = (event) => {
    console.log(event.target.value);
    this.setState({ serverIP: event.target.value});
  }
  updateROSIP = (event) => {
    this.setState({ ROSIP: event.target.value});
  }
  updateSessionName = (name) => {
    this.setState({ sessionName: name});
  }
  updateSessionID = (id) => {
    this.setState({ sessionID: id });
  }
  connectServer = () => {
    let regex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$";
    this.setState({ serverConnected: false});
    this.setState({ logData: [] })
      fetch('http://' + this.state.serverIP + '/api/get/maps',
      {
        method: 'GET',
      })
      .then(response => 
        {
          if(response.ok){
            this.setState({ serverConnected: true });
            this.getData();
          }
        })
  }
  connectROS = () => {
    // let regex = "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$";
    // if(!this.state.ROSIP.match(regex))
    //   console.log("please enter a valid ROS IP");
    // else {
      let rosSession = new ROSLIB.Ros
      ({
        url : 'ws://' + this.state.ROSIP + ":9090"
      });
      this.setState({ ros: rosSession});
        // this.setState({ listener: new ROSLIB.Topic({
        //   ros : rosSession,
        //   name : '/mybot/laser/scan',
        //   messageType : 'sensor_msgs/LaserScan'
        // })});
        var testListener = new ROSLIB.Topic({
          ros: rosSession,
          name: '/ir_data',
          messageType: 'std_msgs/Float32MultiArray'
        });
        testListener.subscribe( (message) => console.log(message));
        
        // this.setState({ listener: new ROSLIB.Topic({
        //   ros: rosSession,
        //   name: '/ir_data',
        //   messageType: 'sensor_msgs/Float32'
        // })});
        //   this.startListen();
        
      //TODO: Add Alert
      // let { ros } = this.state;
      // if(ros == '')
      //   console.log("ROS IS NOT DEFINED");
      // else {
      //   ros.on('error', function(error) {
      //     console.log('Error connecting to websocket server: ', error);
      //     this.setState({ rosConnected: false })
      //   });
    
      //   ros.on('connection', function() {
      //     console.log('Connected to websocket server.');
      //     this.setState({ rosConnected: true })
      //   });
      //   if(this.state.rosConnected) {
      //     this.setState({ listener: new ROSLIB.Topic({
      //       ros : rosSession,
      //       name : '/mybot/laser/scan',
      //       messageType : 'sensor_msgs/LaserScan'
      //     })});
      //     this.startListen();
      //   }
      // }

    // }


  }
  keyDownHandler = (event) => {
    if(!this.state.keyFired) {
      this.setState({ keyFired: true})
    
    console.log("key down" + event.key);
    if(event.keyCode == 68) {
        this.setState({rightPressed: true})
        this.move (   0, -0.5);
    }
    else if(event.keyCode == 65) {
      this.setState({leftPressed: true})
      this.move (   0, 0.5);
    }
    if(event.keyCode == 83) {
      this.setState({downPressed: true})
      this.move (-0.15, 0);
    }
    else if(event.keyCode == 87) {
      this.setState({upPressed: true})
      this.move ( 0.15,   0);
    }
  }
}

keyUpHandler = (event) => {
    this.setState({ keyFired: false})
    console.log("key up" + event.key);
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

  openManageModal = () => {
    this.setState({ manageModalOpen: true });
  }

  openSessionModal = () => {
    this.setState({ sessionModalOpen: true });
  }
  endSession = () => {
    this.setState({ sessionName: '' });
    this.setState({ sessionID: '' });
  }
  closeModal = () => {
    this.setState({ manageModalOpen: false });
    this.setState({ sessionModalOpen: false});
  }


  startListen = () => {
    console.log("break");
    
    this.state.listener.subscribe(function(message) {
      console.log(message);
    });
  }
  stopList = () => {
    this.state.listener.unsubscribe();
  }

  move = (linearx, rotatez) =>
  {
    console.log("tool");
    // Create the velocity command
    let cmdVel = new ROSLIB.Topic
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
        x : linearx,
        y : 0.0,
        z : 0.0
      },
      angular : 
      {
        x : 0.0,
        y : 0.0,
        z : rotatez
      }
    });
    console.log(twist);
    // Publishing the twist message
    cmdVel.publish(twist);
  }
  render() {
    Number.prototype.pad = function (size) {
      let s = String(this);
      while (s.length < (size || 2)) { s = `0${s}`; }
      return s;
    };
    const {
      logData, currentTemp, currentAirVelocity, sessionID, serverConnected, rosConnected, sessionName, serverIP,
    } = this.state;
    const { manageModalOpen, sessionModalOpen } = this.state;
    return (
      <div className="background">
        <Router>
          <Container fluid={true} style={{ height: '100%' }}>
            <ManageModal manageModalOpen={manageModalOpen} serverIP={this.state.serverIP} closeModal={this.closeModal} data={logData.length != 0 ? logData : []} getData={this.getData} />
            <SessionModal
              sessionModalOpen={sessionModalOpen}
              closeModal={this.closeModal}
              updateSessionName={this.updateSessionName}
              updateSessionID={this.updateSessionID}
              sessionID={sessionID} 
              serverIP={serverIP}/>
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
                  updateServerIP={this.updateServerIP} />
              </Col>
              <Col xs={8}>
                <Container fluid={true}>
                  <ButtonToolbar>
                    <Row style={{ width: '100%' }}>
                      <Col>
                        <Button variant={rosConnected ? 'success' : 'warning'}>
                            Drone Status:
                          {' '}
                          {rosConnected ? 'Connected' : 'Disconnected'}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant={sessionID ? 'success' : 'warning'}
                          className="btn-display" disabled={true}
                          size="lg">
                          {sessionID !='' ? sessionID : 'Inactive'}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant={sessionName != '' ? 'success' : 'warning'}
                          className="btn-display" disabled={true}
                          size="lg">
                          {sessionName != '' ? sessionName : 'Inactive'}
                        </Button>
                      </Col>
                      
                    </Row>
                  </ButtonToolbar>

                </Container>
                <Container fluid={true}>
                  <img src={"http://" + this.state.ROSIP + ":8080" + "/stream?topic=/raspicam_node/image_raw&quality=100&invert=true"}/>
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
