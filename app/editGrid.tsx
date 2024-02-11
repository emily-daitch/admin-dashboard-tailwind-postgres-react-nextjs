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


interface User {
    name: string;
    email: string;
    id: GridRowId;
    username: string;
  }

// use fake mutation example available in file history

const useRealMutation = () => {
  return React.useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>(async (resolve, reject) => {
        if(user.name?.trim() === '' || user.username?.trim() === '') {
          reject(new Error("Error while saving user: name/username can't be empty."));
        }
        const usersResponse = await fetch('https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/users', {
          method: 'POST',
          body: JSON.stringify(user)
        });
        const users = await usersResponse.json();
        console.log('users', users);
        if(!users) {
          reject(new Error("Error updating row in database."));
        } else {
          resolve({ ...users})
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

export default function FullFeaturedCrudGrid({ users }: { users: User[] }) {
    console.log('users from crud grid', users);
    const initialRows: GridRowsProp= users;

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
        const response = await mutateRow(newRow);
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
    { field: 'name', headerName: 'Name', width: 180, editable: true },
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
      field: 'username',
      headerName: 'Username',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
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