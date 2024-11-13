// src/pages/Index.js

import React from 'react';
import { Link } from 'react-router-dom';
import './components/Dashboard.css';

const Index = () => {
    return (
        <div className="index-container">
            <div className='b-heading'>
                <div className='heading'>
                <h1>Welcome to the Military Dashboard</h1>
                </div>
            </div>
            <div className="index-links">
            <Link to="/Operation" className="index-link">Operation</Link>
                <Link to="/logistics" className="index-link">Logistics</Link>
                <Link to="/equipment" className="index-link">Equipment</Link>
                <Link to="/deployment" className="index-link">Deployment</Link>
                <Link to="/intelligence-report" className="index-link">Intelligence Report</Link>
                <Link to="/medical-record" className="index-link">Medical Record</Link>
                <Link to="/Mission" className="index-link">Mission</Link>
                <Link to="/Personnel" className="index-link">Personnel</Link>
                <Link to="/Vehicle" className="index-link">Vehicle</Link>
                <Link to="/Training" className="index-link">Training</Link>
                <Link to="/Unit" className="index-link">Unit</Link>
            </div>
        </div>
    );
};

export default Index;
