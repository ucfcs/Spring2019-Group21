import React, { Component } from 'react';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Container from 'react-bootstrap/Container';
import Control from './Control';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
class App extends Component {
	render() {
		return(
				<Container>
					<Row>
						<Col><div id="feed"></div></Col>
					</Row>
					<Row>
						<Col><Control/></Col>
					</Row>
				<Navigation />
				</Container>
				
		);
	}
}
export default App;