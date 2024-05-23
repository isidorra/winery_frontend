import React, { useState, useEffect } from 'react'; // Ensure useState is imported
import './ProductionSchedule.css';
import logo from "../../assets/icons/logo.png";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom'; // Import Link component


const ProductionSchedule = () => {
    //data 
    const localizer = momentLocalizer(moment);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5257/api/production'); // Update URL with your actual backend API URL
            const data = await response.json();
            setActivities(data); // Set activities state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatEvents = () => {
        return activities.map(activity => ({
            id: activity.id,
            title: `Fermentation of ${activity.grape.name}`,
            start: new Date(activity.startDate),
            end: new Date(activity.endDate),
        }));
    };
   
    return (
        <div className="app py-20">
           
            <div className="main">
                <div className="main-content">
                <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>Welcome to the Production Schedule</h1>
                <br></br>
                <div style={{ height: '100%', width: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={formatEvents()} // Use formatted events
                        views={['month']}
                        defaultDate={new Date(2024, 4, 1)}
                    />
                </div>
                <br></br>
                <Link to="/create-fermentation" className="button">Go to Create Fermentation</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductionSchedule;
