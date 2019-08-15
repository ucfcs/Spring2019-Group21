import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './DataTable.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

/* eslint-disable react/prefer-stateless-function */
class DataTable extends Component {
  render() {
    const { data, columns, pageSize } = this.props;
    return (
      <ReactTable
        className="-striped"
        data={data}
        columns={columns}
        defaultPageSize={pageSize}
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
