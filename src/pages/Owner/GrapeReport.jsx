import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './GrapeReport.css'; 


const ProductionSchedule = () => {
    const [grapes, setGrapes] = useState([]);
    const [grapeReports, setGrapeReports] = useState([]);

    useEffect(() => {
        fetchGrapes(); 
        fetchGrapeReports();
    }, []);

    const fetchGrapes = async () => {
        try {
            const response = await fetch('http://localhost:5257/api/grape'); 
            const data = await response.json();
            setGrapes(data); 
        } catch (error) {
            console.error('Error fetching grapes:', error);
        }
    };

    const fetchGrapeReports = async () => {
        try {
            const response = await fetch('http://localhost:5257/api/grape/report'); 
            const data = await response.json();
            setGrapeReports(data); 
        } catch (error) {
            console.error('Error fetching grapeReports:', error);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        let y = 10;

        doc.text('Grape Reports', 10, y);
        y += 10;

        grapeReports.forEach(report => {
            doc.text(`Report ID: ${report.id}`, 10, y);
            y += 10;
            doc.text(`Grape: ${report.grape}`, 10, y);
            y += 10;
            doc.text(`Fertilizer: ${report.fertilizer}`, 10, y);
            y += 10;
            doc.text(`Watering Amount: ${report.wateringAmount}`, 10, y);
            y += 10;
            doc.text(`Pesticide: ${report.pesticide}`, 10, y);
            y += 20;
        });

        doc.save('GrapeReports.pdf');
    };

    return (
        <div className="app py-20">
            <div className="main">
                <div className="main-content">
                    <h1>Welcome to the Production Schedule</h1>

                    <h2>Grapes</h2>
                    <ul>
                        {grapes.map(grape => (
                            <li key={grape.id}>{grape.name}</li>
                        ))}
                    </ul>

                    <h2>Grape Reports</h2>
                    <ul>
                        {grapeReports.map(report => (
                            <li key={report.id}>
                                {report.grape} - {report.fertilizer} - {report.wateringAmount} - {report.pesticide}
                            </li>
                        ))}
                    </ul>

                    <button className="pdf-button" onClick={generatePDF}>Generate PDF</button>
                </div>
            </div>
        </div>
    );
};

export default ProductionSchedule;
