import React from 'react';
import './styles/DataTable.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

/* eslint-disable react/prefer-stateless-function */
function DataTable(props) {
  const { data, columns, pageSize } = props;
  return (
    <ReactTable
      className="-striped"
      data={data.length != 0 ? data : []}
      columns={columns.length != 0 ? columns : []}
      defaultPageSize={10}
      showPaginationBottom={true}
      showPageSizeOptions={false}
    />
  );
}
export default DataTable;
