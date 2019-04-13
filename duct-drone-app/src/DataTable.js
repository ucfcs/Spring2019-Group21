import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './DataTable.css'
class DataTable extends React.Component {
	// constructor(props) {

	// }
	render() {
		var isActive = false;
		return (
			<Table responsive bordered="true"  striped bordered size="sm">
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Table heading</th>
			      <th>Table heading</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td>1</td>
			      <td>Table cell</td>
			      <td>Table cell</td>
			    </tr>
			    <tr>
			      <td>2</td>
			      <td>Table cell</td>
			      <td>Table cell</td>
			    </tr>
			    <tr>
			      <td>3</td>
			      <td>Table cell</td>
			      <td>Table cell</td>
			    </tr>
			  </tbody>
			</Table>
		);
	}
}
export default DataTable;
