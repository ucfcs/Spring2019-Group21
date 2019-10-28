import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Clock from 'react-live-clock';
import './styles/LiveBar.css';
function LiveBar(props) {
  const { currentTemp, currentHumidity } = props;
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

      <Col>
        <div className="circleBase type1">
          {currentTemp}C°
        </div>
      </Col>
      <Col>
        <div className="circleBase type1">
          {currentHumidity}%
        </div>
      </Col>
    </Row>

  </>
  );
}
export default LiveBar;
