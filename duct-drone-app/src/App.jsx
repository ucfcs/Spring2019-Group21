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
    this.state = {
      logData: [],
    };
    this.keyRecord = this.keyRecord.bind(this);
  }
  keyRecord = (event) => {
    // console.log(event.key);
  }
  componentDidMount(){
    document.addEventListener("keydown", this.keyRecord, false);
    fetch('http://localhost:5000/api/get/maps',
    {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      this.setState({logData: data});
    });
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyRecord, false);
  }
  render() {
    Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    }
    const { logData } = this.state;
    const logCols = [
      {
        Header: 'Time',
        accessor: 'time',
        Cell: row=> {
          const date = new Date(row.row.time);
          return(
            <div>
              <span>{date.getHours().pad(2)}:{date.getMinutes().pad(2)}</span>
            </div>
          );
          
        }
      },
      {
        Header: 'Temperature',
        accessor: 'temperature.$numberDecimal',
      },
      {
        Header: 'Air Velocity',
        accessor: 'air_velocity.$numberDecimal',
      },
      {
        Header: 'X',
        accessor: 'coordinateX',
        Cell: row => {
          return(
            <div>
              <span>{row.row._original.coordinates.x}</span>
            </div>
          );
        }
      },
        {
          Header: 'Y',
          accessor: 'coordinateY',
          Cell: row => {
            return(
              <div>
                <span>{row.row._original.coordinates.y}</span>
              </div>
            );
          },
        },
          {
            Header: 'Z',
            accessor: 'coordinateZ',
            Cell: row => {
              return(
                <div>
                  <span>{row.row._original.coordinates.z}</span>
                </div>
              );
            }
          }
    ];
    const currentCols = [
      {
        Header: 'Temperature',
        accessor: 'temperature',
      },
      {
        Header: 'Air Velocity',
        accessor: 'air_velocity',
      }
    ]
    return (
      
      <div onKeyPress={(e) => console.log(e.key)}>
        <Router>
          <Container fluid={true}>
            <Row style={{ height: '100%', width: '100%' }}>
              <Col><div><Sidebar /></div></Col>
              <Col xs={10}>
                <div id="feed" />
                  <Switch>
                  <Route path="/" exact component={Control} />
                  <Route path="/logs/" render={() => 
                      <DataTable columns={logCols} data={logData.length != 0 ? logData[0].sensorData : [] } pageSize={15} />
                    } />
                  <Route path="/data/" render={() => 
                    <DataTable columns={logCols} data={[]}/>
                  } />
                  </Switch>
                  <Navigation />
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
