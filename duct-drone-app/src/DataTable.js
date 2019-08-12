import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './DataTable.css'
import BootstrapTable from 'react-bootstrap-table-next';
class DataTable extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.columns);
	}
	render() {
		// const columns = [{
		//   dataField: 'id',
		//   text: 'Product ID'
		// }, {
		//   dataField: 'name',
		//   text: 'Product Name'
		// }, {
		//   dataField: 'price',
		//   text: 'Product Price'
		// }];
		const products = [{
			id: 23,
			name: "cheesewow",
			price: 23.23

		}];
		return (
			<BootstrapTable keyField='id' data={ products } columns={ this.props.columns } />
		);
	}
}
export default DataTable;
