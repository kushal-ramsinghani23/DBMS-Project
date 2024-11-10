// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="icon">
                <Link to="/"><i className="fas fa-home" title="Home" /></Link>
            </div>
            <div className="icon">
                <Link to="/personnel"><i className="fas fa-user" title="Personnel" /></Link>
            </div>
            <div className="icon">
                <i className="fas fa-wallet" title="Transactions" />
            </div>
            <div className="icon">
                <i className="fas fa-question" title="Help" />
            </div>
        </div>
    );
}

export default Sidebar;
