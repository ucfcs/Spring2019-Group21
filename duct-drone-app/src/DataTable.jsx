import React, { Component } from 'react';
import './DataTable.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

/* eslint-disable react/prefer-stateless-function */
class DataTable extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <ReactTable
        className="-striped"
        data={data}
        columns={columns}
        defaultPageSize={15}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        style={{
          height: '400px',
        }}
      />
    );
  }
}
export default DataTable;
