import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Clock from 'react-live-clock';
import './styles/LiveBar.css';
function LiveBar(props) {
  const { currentTemp, currentHumidity, leakAlertVal } = props;
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
        <Alert variant={'warning'} show={leakAlertVal!=0}>Warning! There are {leakAlertVal}/64 pixels currently above threshold!</Alert>
    </Row>

  </>
  );
}
export default LiveBar;
