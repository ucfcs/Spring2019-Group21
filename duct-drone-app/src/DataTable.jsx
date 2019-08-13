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
        data={data}
        columns={columns}
        defaultPageSize={data.length}
        showPaginationBottom={false}
        showPageSizeOptions={false}
      />
    );
  }
}
export default DataTable;
