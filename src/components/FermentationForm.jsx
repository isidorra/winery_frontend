import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, Grid } from '@mui/material'; // Import Grid from @mui/material
import * as Yup from "yup";
import './FermentationForm.css';
import axios from 'axios';

const FermentationForm = ({ grapes }) => {
  const validationSchema = Yup.object({
    grape: Yup.string().required('Grape is required'),
    startDate: Yup.date().required('Start date is required').min(new Date(), 'Start date cannot be in the past'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
  });

  const formik = useFormik({
    initialValues: {
      grape: '',
      startDate: '',
      endDate: '',
      amountInLiters: '',
      sugar: '',
      yeast: '',
      temperature: '',
      phValue: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      // Send form data to the API
      axios.post('http://localhost:5257/api/fermentation/add', values)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
          // Handle success response
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          // Handle error response
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <Grid container spacing={2}> {/* Use Grid container for layout */}
        {/* First column */}
        <Grid item xs={6}> {/* Divide into 2 columns (6 grid units each) */}
          <div className="form-group">
          <label htmlFor="grape">Grape</label>
            <TextField
              name="grape"
              select
              value={formik.values.grape}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.grape && Boolean(formik.errors.grape)}
              helperText={formik.touched.grape && formik.errors.grape}
            >
              {/* Options for grape selection */}
              {grapes.map(grape => (
                <MenuItem key={grape.id} value={grape.id}>
                  {grape.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="form-group">
          <label htmlFor="startDate">Start date</label>
            <TextField
              name="startDate"
              type="date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
          </div>
          <div className="form-group">
          <label htmlFor="endDate">End date</label>
            <TextField
              name="endDate"
              type="date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
          </div>
          <div className="form-group">
          <label htmlFor="amountInLiters">Amount in liters</label>
            <TextField
              name="amountInLiters"
              type="number"
              value={formik.values.amountInLiters}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.amountInLiters && Boolean(formik.errors.amountInLiters)}
              helperText={formik.touched.amountInLiters && formik.errors.amountInLiters}
            />
          </div>
        </Grid>
        {/* Second column */}
        <Grid item xs={6}> {/* Divide into 2 columns (6 grid units each) */}
          <div className="form-group">
          <label htmlFor="sugar">Sugar</label>
            <TextField
              name="sugar"
              value={formik.values.sugar}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.sugar && Boolean(formik.errors.sugar)}
              helperText={formik.touched.sugar && formik.errors.sugar}
            />
          </div>
          <div className="form-group">
          <label htmlFor="yeast">Yeast</label>
            <TextField
              name="yeast"
              value={formik.values.yeast}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.yeast && Boolean(formik.errors.yeast)}
              helperText={formik.touched.yeast && formik.errors.yeast}
            />
          </div>
          <div className="form-group">
          <label htmlFor="temperature">Temperature</label>
            <TextField
              name="temperature"
              type="number"
              value={formik.values.temperature}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.temperature && Boolean(formik.errors.temperature)}
              helperText={formik.touched.temperature && formik.errors.temperature}
            />
          </div>
          <div className="form-group">
          <label htmlFor="phValue">Ph value</label>
            <TextField
              name="phValue"
              type="number"
              value={formik.values.phValue}
              onChange={formik.handleChange}
              fullWidth
              variant="outlined"
              error={formik.touched.phValue && Boolean(formik.errors.phValue)}
              helperText={formik.touched.phValue && formik.errors.phValue}
            />
          </div>
        </Grid>
      </Grid>
      <div className="form-group">
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default FermentationForm;
