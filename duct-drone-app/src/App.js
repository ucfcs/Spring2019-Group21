import React, { Component } from 'react';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Container from 'react-bootstrap/Container';
import Control from './Control';
import Login from './Login';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './App.css';
class App extends Component {
	render() {
		return (<Login/>);
		
		// return(
		// 	<Router>
		// 		<Container>
		// 			<Row>
		// 				<Col><div id="feed"></div></Col>
		// 			</Row>
		// 	        <Row>
		// 	          <Col>
		// 	          	<Route path="/" exact component={Control}/>
		// 				<Route path="/data/" component={DataTable}/>
		// 			  </Col>
		// 	        </Row>
		// 			<Navigation/>
		// 		</Container>
		// 	</Router>
		// );
	}
}
export default App;