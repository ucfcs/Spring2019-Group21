import React, { Component } from 'react';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Container from 'react-bootstrap/Container';
import Control from './Control';
import Login from './Login';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './App.css';


class App extends Component {
	render() {
		const InApp = () => 
				<Container>
					<Row>
						<Col><div id="feed"></div></Col>
					</Row>
			        <Row>
			          <Col>
			          	<Switch>
				          	<Route path="/app/control/" exact component={Control}/>
							<Route path="/app/data/" component={DataTable}/>
						</Switch>
					  </Col>
			        </Row>
					<Navigation/>
				</Container>
		return(
			<Router>
				<Switch>
					<Route path="/app/" component={InApp}/>
					<Route path="/" component={Login}/>
				</Switch>
			</Router>
		);
	}
}
export default App;