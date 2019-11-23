import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Clock from 'react-live-clock';
import './styles/LiveBar.css';
import ChangeThreshold from './ChangeThreshold';

const ROSLIB = require('roslib');
class LiveBar extends React.Component{
  state = {
    threshold: 2,
    showDecrement: false,
    showIncrement: false,
    ros: '',
  }
  incrementThreshold = () => {
    this.setState({threshold: this.state.threshold+1}, () => this.updateROSThreshold())
    // this.updateROSThreshold();
  }
  decrementThreshold = () => {
    let {threshold} = this.state;
    if(threshold > 0)
      this.setState({threshold: threshold-1}, () => this.updateROSThreshold())
    // this.updateROSThreshold();
  }
  componentDidMount() {
    const rosSession = new ROSLIB.Ros({
      url: `ws://10.171.204.174:9090`
    });
    this.setState({ros: rosSession});
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
    console.log(thresholdMsg);
    // Publishing the twist message
    cmdThreshold.publish(thresholdMsg);
  }
  render() {
    const {threshold} = this.state;
  const { ros, updateROSThreshold, currentTemp, currentHumidity, leakAlertVal } = this.props;
  return (
    <>
    <Row style={{ height: '10% '}}/>
    <Row>
      <Col>
      <h1>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'} />
      </h1>
      </Col>
    </Row>
    <Row style={{ height: '10% '}}/>
    <Row>
        <div className="circleBase type1">
          {currentTemp}C°
        </div>
    </Row>
    <Row>
      <div className="circleBase type1">
        {currentHumidity}%
      </div>
    </Row>
    <Row>
      <ChangeThreshold threshold={threshold} decrementThreshold={this.decrementThreshold} incrementThreshold={this.incrementThreshold}/>
    </Row>
    <Row>
        <Alert variant={'warning'} show={leakAlertVal!=0}>Warning! There are {leakAlertVal}/64 pixels currently above threshold!</Alert>
    </Row>


  </>
  );
  }
}

export default LiveBar;
