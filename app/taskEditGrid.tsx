'use client'
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValidRowModel
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { DailyTask } from './interfaces';

// use fake mutation example available in file history
// should change mutation back into something generic, we want to use this for any table
const useRealMutation = () => {
  return React.useCallback(
    (task: Partial<DailyTask>) =>
      new Promise<Partial<DailyTask>>(async (resolve, reject) => {
        console.log('task from useRealMutation', task);
        if(task.title?.trim() === '' || task.username?.trim() === '') {
          reject(new Error("Error while saving task: title/username can't be empty."));
        }
        const tasksResponse = await fetch('https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/daily', {
          method: 'POST',
          body: JSON.stringify(task)
        });
        const tasks = await tasksResponse.json();
        console.log('tasks', tasks);
        if(!tasks) {
          reject(new Error("Error updating row in database."));
        } else {
          console.log('resolving with', tasks[0]);
          resolve(tasks.task[0])
        }
      }),
    [],
  );
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => {
      console.log('oldRows', oldRows);
      return [...oldRows, { id, name: '', age: '', isNew: true }]
    });
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ rowsProp }: { rowsProp: GridRowsProp }) {
    console.log('rows from crud grid', rowsProp);
    const initialRows: GridRowsProp= rowsProp;

    const [rows, setRows] = React.useState<GridRowsProp>(initialRows);
    console.log('rows', rows);

    React.useEffect(() => {
        setRows(initialRows);
      }, [initialRows]);
    console.log('rows2', rows);

    const mutateRow = useRealMutation();

    const [snackbar, setSnackbar] = React.useState<Pick<
      AlertProps,
      'children' | 'severity'
    > | null>(null);
  
    const handleCloseSnackbar = () => setSnackbar(null);
  
    const processRowUpdate = React.useCallback(
      async (newRow: GridRowModel) => {
        // Make the HTTP request to save in the backend
        console.log('newRow', newRow);
        const response = await mutateRow(newRow);
        console.log('processRowUpdate tasks response', response);
        setSnackbar({ children: 'User successfully saved', severity: 'success' });
        return response;
      },
      [mutateRow],
    );
  
    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
      setSnackbar({ children: error.message, severity: 'error' });
    }, []);

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
          setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 180, editable: true },
    {
      field: 'id',
      headerName: 'id',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'taskorder',
      headerName: 'Order',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'Username',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
              key="save"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key="cancel"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key="edit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key="delete"
          />,
        ];
      },
    },
  ];
  console.log('returning rows cols', rows, columns);
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          sorting: {
            sortModel: [{ field: 'taskorder', sort: 'asc' }],
          },
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}