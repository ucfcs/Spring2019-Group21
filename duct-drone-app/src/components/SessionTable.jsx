import React from 'react';
import DataTable from './DataTable';

function SessionTable(props) {
  const logCols = [
    {
      Header: 'Time',
      accessor: 'time',
      Cell: (row) => {
        const date = new Date(row.row.time);
        return (
          <div>
            <span>
              {date.getHours().pad(2)}
:
              {date.getMinutes().pad(2)}
            </span>
          </div>
        );
      },
    },
    {
      Header: 'Temperature',
      accessor: 'temperature.$numberDecimal',
    },
    {
      Header: 'Air Velocity',
      accessor: 'air_velocity.$numberDecimal',
    },
    {
      Header: 'X',
      accessor: 'coordinateX',
      Cell: row => (
        <div>
          <span>{row.row._original.coordinates.x}</span>
        </div>
      ),
    },
    {
      Header: 'Y',
      accessor: 'coordinateY',
      Cell: row => (
        <div>
          <span>{row.row._original.coordinates.y}</span>
        </div>
      ),
    },
    {
      Header: 'Z',
      accessor: 'coordinateZ',
      Cell: row => (
        <div>
          <span>{row.row._original.coordinates.z}</span>
        </div>
      ),
    },
  ];
  const { data } = props;
  return (
    <DataTable columns={logCols} data={data} />
  );
}
export default SessionTable;
