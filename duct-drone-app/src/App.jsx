import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BrowserRouter as Router, Redirect, Route, Link, Switch, IndexRedirect,
} from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
} from 'react-bootstrap';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Control from './Control';
import Login from './Login';
import Sidebar from './Sidebar';
import './App.css';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    const columns = [
      {
        Header: 'Data Header 1',
        accessor: 'dataheader1',
      },
      {
        Header: 'Data Header 2',
        accessor: 'dataheader2',
      },
    ];
    const data = [{
      id: 23,
      dataheader1: 'yee',
      dataheader2: '23.23',
    }];
    return (
      <Router>
        <Container>
          <Row style={{ height: '100%', width: '100%', border: 'black' }}>
            <Col><div className="Sidebar"><Sidebar /></div></Col>
            <Col xs={9}>
              <div id="feed" />
              <div id="action-bar">
                <Switch>
                  <Route path="/" exact component={Control} />
                  <Route path="/data/" component={() => <DataTable columns={columns} data={data} />} />
                  <Route path="/logs/" component={() => <DataTable columns={columns} data={data} />} />
                </Switch>
              </div>
              <Navigation />
            </Col>
            <Col />
          </Row>

        </Container>
      </Router>
    );
  }
}
export default App;
