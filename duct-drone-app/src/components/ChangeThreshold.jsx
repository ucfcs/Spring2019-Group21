import React from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';

function ChangeThreshold(props) {
  const { threshold, decrementThreshold, incrementThreshold } = props;

  return (
    <div>
      <h3>Leak Detection Sensitivity:</h3>
      <h2>{threshold}</h2>
      <Button variant="primary" onClick={incrementThreshold}>+</Button>
      <Button variant="primary" onClick={decrementThreshold}>-</Button>
    </div>

  );
}
export default ChangeThreshold;
