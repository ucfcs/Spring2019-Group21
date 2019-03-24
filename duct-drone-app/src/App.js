import React, { Component } from 'react';
import Navigation from './Navigation';
import DataTable from './DataTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class App extends Component {
	render() {
		return(
				<Container>
				<Row>
					<Col><DataTable /></Col>
				</Row>
				<Row>
					<Col><Navigation /></Col>
				</Row>
				</Container>
		);
	}
}
export default App;