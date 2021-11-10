import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { colors } from '../../../../styles';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'Hora', headerName: 'Hora', type: 'Date', width: 70 },
  { field: 'Dom01', headerName: 'DOM 01', width: 130 },
  { field: 'Seg02', headerName: 'SEG 02', width: 130 },
  { field: 'Ter03', headerName: 'TER 03', width: 130 },
  { field: 'Qua04', headerName: 'QUA 04', width: 130 },
  { field: 'Qui05', headerName: 'QUI 05', width: 130 },
  { field: 'Sex06', headerName: 'SEX 06', width: 130 },
  { field: 'Sab07', headerName: 'SAB 07', width: 130 },
];

const rows = [
  {
    id: 1,
    Hora: '13:00',
    Dom01: null,
    Seg02: 'Paciente ID',
    Ter03: null,
    Qua04: null,
    Qui05: null,
    Sex06: 'paciente ID',
    Sab07: null,
  },
  {
    id: 2,
    Hora: '13:30',
    Dom01: null,
    Seg02: null,
    Ter03: null,
    Qua04: 'Paciente ID',
    Qui05: null,
    Sex06: null,
    Sab07: null,
  },
  { id: 3, Hora: '14:00', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
  { id: 4, Hora: '14:30', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
  {
    id: 5,
    Hora: '15:00',
    Dom01: null,
    Seg02: 'Paciente ID',
    Ter03: null,
    Qua04: null,
    Qui05: null,
    Sex06: null,
    Sab07: null,
  },
  { id: 6, Hora: '15:30', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
  { id: 7, Hora: '16:00', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
  { id: 8, Hora: '16:30', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
  { id: 9, Hora: '17:00', Dom01: null, Seg02: null, Ter03: null, Qua04: null, Qui05: null, Sex06: null, Sab07: null },
];

const Calendar = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[]} />
    </div>
  );
};

export { Calendar };
