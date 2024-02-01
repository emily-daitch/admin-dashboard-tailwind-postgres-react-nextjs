'use client'
import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export default function BasicEditingGrid() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    editable: true,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'Emily',
    age: 25,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 2,
    name: 'John',
    age: 36,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 3,
    name: 'Mike',
    age: 19,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 4,
    name: 'Meghan',
    age: 28,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 5,
    name: 'Sarah',
    age: 23,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
];