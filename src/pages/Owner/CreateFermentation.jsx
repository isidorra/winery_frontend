import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import React from 'react';
import './CreateFermentation.css'
import {  Tabs, Tab, Typography, Box, TextField, Button, MenuItem, FormControl, Select, InputLabel  } from '@mui/material';
import axios from 'axios';
import * as Yup from "yup";




const TabComponent = () => {
  const [value, setValue] = useState(0);
  const [grapes, setGrapes] = useState([]);

  useEffect(() => {
    // Fetch grapes from the API when the component mounts
    axios.get('http://localhost:5257/api/grape')
      .then(response => {
        setGrapes(response.data); // Set fetched grapes to state
      })
      .catch(error => {
        console.error('Error fetching grapes:', error);
      });
  }, []); // Empty dependency array to run effect only once on mount

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues); // You can handle form submission here
  };

  const validationSchema = Yup.object({
    grape: Yup.string().required('Grape is required'),
    startDate: Yup.date().required('Start date is required').min(new Date(), 'Start date cannot be in the past'),
    endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
    amountInLiters: Yup.number().positive('Amount must be a positive number'),
    temperature: Yup.number().positive('Temperature must be a positive number'),
    phValue: Yup.number().positive('pH Value must be a positive number'),
  });

  const formik = useFormik({
    initialValues: {
      grape: '',
      startDate: '',
      endDate: '',
      amountInLiters: '',
      yeast: '',
      sugar: '',
      temperature: '',
      phValue: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const fermentationData = {
        grapeId: values.grape,
        startDate: values.startDate,
        endDate: values.endDate,
        amount: values.amountInLiters,
        yeast: values.yeast,
        sugar: values.sugar,
        temperature: values.temperature,
        ph: values.phValue,
      };

      // Send data to the backend
      axios.post('http://localhost:5257/api/fermentation/add', fermentationData)
        .then(response => {
          console.log('Fermentation added successfully:', response.data);
          alert('Scheduling was successful');
          // Handle success response as needed
        })
        .catch(error => {
          console.error('Error adding fermentation:', error);
          // Handle error response as needed
        });
    },
  });

  return (
    <div className="app py-20">
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label="Fermentation" className="tab" />
        <Tab label="Pressing" className="tab" />
        <Tab label="Agging" className="tab" />
        <Tab label="Bottling" className="tab" />
      </Tabs>

      {value === 0 && (
        <>
        <form onSubmit={formik.handleSubmit} className="form-container">
          <div className="form-column">
            <div className="form-group">
            {/* Dropdown menu for selecting grape */}
            <FormControl fullWidth margin="normal">
                <InputLabel id="grape-label">Grape</InputLabel>
                <Select
                  labelId="grape-label"
                  id="grape"
                  name="grape"
                  value={formik.values.grape}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                >
                  {/* Map over fetched grapes and create menu items */}
                  {grapes.map(grape => (
                    <MenuItem key={grape.id} value={grape.name}>{grape.name}</MenuItem>
                  ))}
                </Select>
                {formik.touched.grape && formik.errors.grape ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.grape}
                  </Typography>
                ) : null}
              </FormControl>
            </div>
            <div className="form-group">
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              InputLabelProps={{
              shrink: true,
                }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
                <Typography variant="caption" color="error">
                  {formik.errors.startDate}
                </Typography>
              ) : null}
            </div>
            <div className="form-group">
            <TextField
              name="endDate"
              label="End Date"
              type="date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              InputLabelProps={{
              shrink: true,
                }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
                <Typography variant="caption" color="error">
                  {formik.errors.endDate}
                </Typography>
              ) : null}
            </div>
            <div className="form-group">
            <TextField
              name="amountInLiters"
              label="Amount in Liters"
              type="number"
              value={formik.values.amountInLiters}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group full-width">
            <TextField
              name="yeast"
              label="Yeast"
              value={formik.values.yeast}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            </div>
            <div className="form-group full-width">
            <TextField
              name="sugar"
              label="Sugar"
              value={formik.values.sugar}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            </div>
            <div className="form-group full-width">
            <TextField
              name="temperature"
              label="Temperature"
              type="number"
              value={formik.values.temperature}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            </div>
            <div className="form-group full-width">
            <TextField
              name="phValue"
              label="pH Value"
              type="number"
              value={formik.values.phValue}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />
            </div>
          
          <div className="form-group">
            <Button type="submit" variant="contained" color="primary" className="form-submit-button">
              Submit
            </Button>
          </div>
          </div>
        </form>
        
          </>
      )}

      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== 0}
        id={`tabpanel-0`}
        aria-labelledby={`tab-0`}
        className="tab-content"
      >
      </Typography>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== 1}
        id={`tabpanel-1`}
        aria-labelledby={`tab-1`}
        className="tab-content"
      >
        Tab 2 Content
      </Typography>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== 2}
        id={`tabpanel-2`}
        aria-labelledby={`tab-2`}
        className="tab-content"
      >
        Tab 3 Content
      </Typography>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== 3}
        id={`tabpanel-3`}
        aria-labelledby={`tab-3`}
        className="tab-content"
      >
        Tab 4 Content
      </Typography>
    </Box>
    </div>
  );
};

export default TabComponent;