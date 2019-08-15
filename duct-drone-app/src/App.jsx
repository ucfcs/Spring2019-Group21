import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BrowserRouter as Router, Redirect, Route, Link, Switch, IndexRedirect,
} from 'react-router-dom';
import {
  Navbar,
} from 'react-bootstrap';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Control from './Control';
import Login from './Login';
import Sidebar from './Sidebar';
import './App.css';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  constructor(props){
    super(props);
    this.keyRecord = this.keyRecord.bind(this);
  }
  keyRecord = (event) => {
    console.log(event.key);
  }
  componentDidMount(){
    document.addEventListener("keydown", this.keyRecord, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyRecord, false);
  }
  render() {
    const currentDataCols = [
      {
        Header: 'Temperature',
        accessor: 'currentTemp',
      },
      {
        Header: 'Air Velocity',
        accessor: 'currentAirVelocity',
      },
    ];
    const currentData = [{
      id: 23,
      currentTemp: '90 F',
      currentAirVelocity: '30 m/s',
    }];
    const logCols = [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Temperature',
        accessor: 'logTemp',
      },
      {
        Header: 'Air Velocity',
        accessor: 'airVelocity',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Battery',
        accessor: 'batteryLevel',
      },

    ];
    const logData = [
      {
        id: 3535,
        date: '8/13/19',
        time: '3:00 PM',
        logTemp: '93 F',
        airVelocity: '30 m/s',
        location: '90 N 35 E',
        batteryLevel: '30%',
      },
      {
        id: 3535,
        date: '8/13/19',
        time: '3:00 PM',
        logTemp: '93 F',
        airVelocity: '30 m/s',
        location: '90 N 35 E',
        batteryLevel: '30%',
      },
      {
        id: 3535,
        date: '8/13/19',
        time: '3:00 PM',
        logTemp: '93 F',
        airVelocity: '30 m/s',
        location: '90 N 35 E',
        batteryLevel: '30%',
      },
    ];
    return (
      <div onKeyPress={(e) => console.log(e.key)}>
        <Router>
          <Container>
            <Row style={{ height: '100%', width: '100%', border: 'black' }}>
              <Col><div className="Sidebar"><Sidebar /></div></Col>
              <Col xs={8}>
                <div id="feed" />
                <div id="action-bar">
                  <Switch>
                    <Route path="/" exact component={Control} />
                    <Route path="/data/" component={() => <DataTable columns={currentDataCols} data={currentData} />} />
                    <Route path="/logs/" component={() => <DataTable columns={logCols} data={logData} />} />
                  </Switch>
                  <Navigation />
                </div>
              </Col>
              <Col />
            </Row>
          </Container>
        </Router>
      </div>

    );
  }
}
export default App;
