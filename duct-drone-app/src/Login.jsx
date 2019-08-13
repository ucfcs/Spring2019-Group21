import React, { Component } from 'react';
import {
  Button, Form, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
		      We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
		    Submit
        </Button>
        <Link to="/app/">proceed to next page</Link>
      </Form>
    );
  }
}


export default Login;
