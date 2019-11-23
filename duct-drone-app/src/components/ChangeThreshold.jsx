import React from 'react';
import {Button, ButtonToolbar }from 'react-bootstrap';
function ChangeThreshold(props) {
    let {threshold, decrementThreshold, incrementThreshold} = props;

    return (
        <div>
            {threshold}
            <Button variant="primary" onClick={incrementThreshold}>+</Button>
            <Button variant="primary" onClick={decrementThreshold}>-</Button>
        </div>
        
    );
}
export default ChangeThreshold;