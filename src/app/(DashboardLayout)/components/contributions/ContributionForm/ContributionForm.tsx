'use client';
import React, { useEffect, useState } from 'react';
import {
  ContributionAddEditForm,
  ContributionFormProps,
} from './ContributionForm.types';
import { useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import {
  getAddSchemaContribution,
  getInitialValuesContribution,
  getUpdateSchemaContribution,
} from './ContributionForm.validations';
import * as Yup from 'yup';
import { filter, find, isUndefined, map } from 'lodash';
import { useContribution, useCountry, useProduct, useZone } from '@/hooks';
import { BasicSnackbar } from '../../shared/BasicSnackbar';

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
  GridSlots,
} from '@mui/x-data-grid';

import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useTarif } from '@/hooks/useTarif';

export function ContributionForm(props: ContributionFormProps) {
  const { onClose, onRefetch, contribution = undefined } = props;
  //TODO: Poner snackbar globalmente
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const { addContribution, updateContribution } = useContribution();
  const { getProducts, products } = useProduct();
  const { getZones, zones } = useZone();
  const [filteredZones, setFilteredZones] = useState([]);
  const { getCountries, countries } = useCountry();
  const { getTarifs, tarifs } = useTarif();

  useEffect(() => {
    (async () => {
      await getProducts().catch((err) => {
        setMessageSnackbar(err?.message || 'Error');
      });
      await getZones().catch((err) => {
        setMessageSnackbar(err?.message || 'Error');
      });
      await getCountries().catch((err) => {
        setMessageSnackbar(err?.message || 'Error');
      });
      await getTarifs().catch((err) => {
        setMessageSnackbar(err?.message || 'Error');
      });
    })();
  }, [contribution]);

  return (
    <div className="add-edit-user-form-admin">
      <AddEditForm
        products={products}
        zones={zones}
        countries={countries}
        tarifs={tarifs}
        contribution={contribution}
        addContribution={addContribution}
        updateContribution={updateContribution}
        onClose={onClose}
        onRefetch={onRefetch}
        setMessageSnackbar={setMessageSnackbar}
        filteredZones={filteredZones}
        setFilteredZones={setFilteredZones}
      />
      <BasicSnackbar messageSnackbar={messageSnackbar}></BasicSnackbar>
    </div>
  );
}

function AddEditForm(props: ContributionAddEditForm) {
  const {
    products,
    zones,
    countries,
    contribution,
    addContribution,
    updateContribution,
    onClose,
    onRefetch,
    setMessageSnackbar,
    filteredZones,
    setFilteredZones,
  } = props;

  const formik = useFormik({
    initialValues: getInitialValuesContribution(contribution),
    validationSchema: Yup.object(
      isUndefined(contribution)
        ? getAddSchemaContribution()
        : getUpdateSchemaContribution(contribution),
    ),
    validateOnChange: true,
    onSubmit: async (values: any) => {
      try {
        if (isUndefined(contribution)) {
          await addContribution(values);
        } else {
          const id = contribution?.id || '';
          await updateContribution(id, values);
        }
        onRefetch();
        onClose();
      } catch (err: any) {
        setMessageSnackbar(err?.message || 'Error');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Quotes Form
      </Typography>
      <Grid container spacing={1} paddingX={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <Typography color="error">
                {formik.errors.name as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <Typography color="error">
                {formik.errors.email as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <Typography color="error">
                {formik.errors.phone as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="countryId"></InputLabel>
            <Autocomplete
              id="countryId"
              options={countries}
              getOptionLabel={(option) => option.name}
              value={
                countries.find(
                  (country) => country.id === formik.values.countryId,
                ) || null
              }
              onChange={(e, value) => {
                const _filteredZones = filter(zones, (zone) => {
                  return zone.country.id === value?.id;
                });
                setFilteredZones(_filteredZones);
                formik.handleChange({
                  target: { name: 'countryId', value: value?.id || '' },
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="outlined" />
              )}
            />
            {formik.errors.countryId && formik.touched.countryId && (
              <Typography color="error">
                {formik.errors.countryId as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="zoneId"></InputLabel>
            <Autocomplete
              id="zoneId"
              options={filteredZones}
              getOptionLabel={(option) => option.name}
              value={
                filteredZones.find(
                  (zone: any) => zone.id === formik.values.zoneId,
                ) || null
              }
              onChange={(e, value) => {
                formik.handleChange({
                  target: { name: 'zoneId', value: value?.id || '' },
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Zone" variant="outlined" />
              )}
            />
            {formik.errors.zoneId && formik.touched.zoneId && (
              <Typography color="error">
                {formik.errors.zoneId as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} className="w-full">
          <AddEditProducts
            {...props}
            zoneId={formik.values.zoneId}
            countryId={formik.values.countryId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="totalCost">Costo Total</InputLabel>
            <Input
              id="totalCost"
              name="totalCost"
              type="number"
              value={formik.values.totalCost}
              onChange={formik.handleChange}
            />
            {formik.errors.totalCost && formik.touched.totalCost && (
              <Typography color="error">
                {formik.errors.totalCost as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="totalPrice">Precio Total</InputLabel>
            <Input
              id="totalPrice"
              name="totalPrice"
              type="number"
              value={formik.values.totalPrice}
              onChange={formik.handleChange}
            />
            {formik.errors.totalPrice && formik.touched.totalPrice && (
              <Typography color="error">
                {formik.errors.totalPrice as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="shippingCost">Costo de Envío</InputLabel>
            <Input
              id="shippingCost"
              name="shippingCost"
              type="number"
              value={formik.values.shippingCost}
              onChange={formik.handleChange}
            />
            {formik.errors.shippingCost && formik.touched.shippingCost && (
              <Typography color="error">
                {formik.errors.shippingCost as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="totalFinal">Total Final</InputLabel>
            <Input
              id="totalFinal"
              name="totalFinal"
              type="number"
              value={formik.values.totalFinal}
              onChange={formik.handleChange}
            />
            {formik.errors.totalFinal && formik.touched.totalFinal && (
              <Typography color="error">
                {formik.errors.totalFinal as string}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, mr: 2 }}
          >
            Enviar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

function AddEditProducts(props: ContributionAddEditForm) {
  const {
    products,
    zones,
    countries,
    contribution,
    addContribution,
    updateContribution,
    onClose,
    onRefetch,
    setMessageSnackbar,
    tarifs,
    countryId,
    zoneId,
  } = props;

  const roles = ['Market', 'Finance', 'Development'];
  const randomRole = () => {
    return randomArrayItem(roles);
  };

  const initialRows: GridRowsProp = [];

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const product = find(products, { name: newRow.product });
    console.log('product', product);

    if (product) {
      // Actualizar las propiedades del nuevo registro
      const price = product.price;
      const code = product.code;
      const units = newRow.units || 0;
      const markup = (newRow.markup || 0) / 100; // Convertir markup a decimal
      const selling_price = price * (1 + markup) * units;
      const totalWeight = product.weight * units; // Calcular peso

      // const productLookup =
      //   newRow.product + newRow.countryId + newRow.zoneId.join('');
      const multipleWeight = Math.floor(totalWeight / 100) * 100;
      const tarif = find(tarifs, (tarif) => {
        return (
          tarif.country.id === countryId &&
          tarif.zone.id === zoneId &&
          tarif.range_kg === multipleWeight
        );
      });
      // Buscar el precio de la tabla de tarifas
      const tariffPrice = tarif ? tarif.price : 0;

      // Calcular el precio basado en la fórmula
      const priceFromProducts = product.ffValencia + tariffPrice;
      const lmd = units * priceFromProducts;

      const total = selling_price + lmd;

      newRow = {
        ...newRow,
        price,
        code,
        selling_price,
        weight: totalWeight,
        lmd,
        total,
      };
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'product',
      headerName: 'Product',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: map(products, 'name'),
      getOptionValue(value) {
        return value;
      },
    },
    {
      field: 'code',
      headerName: 'Code',
      type: 'string',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'units',
      headerName: 'Units',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'markup',
      headerName: 'Mark Up %',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'selling_price',
      headerName: 'Selling Price',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'lmd',
      headerName: 'LMD',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
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
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

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
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add product
      </Button>
    </GridToolbarContainer>
  );
}
