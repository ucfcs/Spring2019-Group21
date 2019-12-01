import React from 'react';
import DataTable from './DataTable';

function SessionTable(props) {
  const logCols = [
    {
      Header: 'Time',
      accessor: 'date',
      Cell: (row) => {
        const date = new Date(row.row.date);
        return (
          <div>
            <span>
              {date.getMonth()}
/
              {date.getDate()}
/
              {date.getFullYear()}
              &nbsp;&nbsp;&nbsp;&nbsp;
              {date.getUTCHours()}
:
              {date.getUTCMinutes()}
            </span>

          </div>
        );
      },
    },
    {
      Header: 'Temperature',
      accessor: 'temperature.$numberDecimal',
      width: 120,
    },
    {
      Header: 'Humidity',
      accessor: 'humidity.$numberDecimal',
      width: 120,
    },
  ];
  const { data } = props;
  return (
    <DataTable columns={logCols} data={data} />
  );
}
export default SessionTable;
