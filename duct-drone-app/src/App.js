import React, { Component } from 'react';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Container from 'react-bootstrap/Container';
import Control from './Control';
import Login from './Login';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Redirect, Route, Link, Switch, IndexRedirect} from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './App.css';


class App extends Component {
	render() {
		return(
			<Router>
					<Container>
					<Row>
						<Col><div className="Sidebar"><Sidebar/></div></Col>
            <Col xs={9}>
              <div id="feed"><Switch>
              <Route path="/app/control/" exact component={Control} />
              <Route path="/app/data/" component={DataTable} />
              <Route path="/app/logs/" component={DataTable} />
              </Switch>
              </div>
            </Col>
                </Row>
					<Navigation/>

				</Container>
			</Router>
		);
	}
}
export default App;