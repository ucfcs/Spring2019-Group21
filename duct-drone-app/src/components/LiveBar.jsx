import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './styles/LiveBar.css';
function LiveBar(props) {
  const { currentTemp, currentAirVelocity } = props;
  return (
    <>
    <Row style={{ height: '20%' }} />
    <Row>
      <Col>
        <div className="circleBase type1">
          {currentTemp}C°
        </div>
      </Col>
      <Col>
        <div className="circleBase type1">
          {currentAirVelocity}
          <sup>m</sup>
            &frasl;
          <sub>s</sub>
        </div>
      </Col>
    </Row>

  </>
  );
}
export default LiveBar;
