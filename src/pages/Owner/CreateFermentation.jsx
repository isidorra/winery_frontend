import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import axios from 'axios';
import FermentationForm from '../../components/FermentationForm'; // Import the FermentationForm component
import './CreateFermentation.css'; // Import the CSS file

const TabComponent = () => {
  const [value, setValue] = useState(0);
  const [grapes, setGrapes] = useState([]);
  const [pressingTypes, setPressingTypes] = useState([]);

  useEffect(() => {
    // Fetch grapes from the API when the component mounts
    axios.get('http://localhost:5257/api/grape')
      .then(response => {
        setGrapes(response.data); // Set fetched grapes to state
      })
      .catch(error => {
        console.error('Error fetching grapes:', error);
      });
    
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <FermentationForm grapes={grapes} /> // Render FermentationForm component here
        )}

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
