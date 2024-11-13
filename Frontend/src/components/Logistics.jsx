// src/components/Logistics.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Logistics = () => {
    const [logistics, setLogistics] = useState([]);
    const [newLogistics, setNewLogistics] = useState({
        Supply_Type: '',
        Quantity: '',
        Status: '',
        Mission_ID: ''
    });

    useEffect(() => {
        fetchLogistics();
    }, []);

    const fetchLogistics = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Logistics');
            setLogistics(response.data);
        } catch (error) {
            console.error("Error fetching logistics:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLogistics((prev) => ({ ...prev, [name]: value }));
    };

    const addLogistics = async () => {
        try {
            await axios.post('http://localhost:5000/Logistics', newLogistics);
            setNewLogistics({
                Supply_Type: '',
                Quantity: '',
                Status: '',
                Mission_ID: ''
            });
            fetchLogistics();
        } catch (error) {
            console.error("Error adding new logistics:", error);
        }
    };

    const deleteLogistics = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Logistics/${id}`);
            fetchLogistics();
        } catch (error) {
            console.error("Error deleting logistics:", error);
        }
    };

    return (
        <div className="center-div">
            <div className="main-card">
                <h2>Logistics</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="Supply_Type"
                        placeholder="Supply Type"
                        value={newLogistics.Supply_Type}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="Quantity"
                        placeholder="Quantity"
                        value={newLogistics.Quantity}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="Status"
                        placeholder="Status"
                        value={newLogistics.Status}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="Mission_ID"
                        placeholder="Mission ID"
                        value={newLogistics.Mission_ID}
                        onChange={handleChange}
                    />
                    <button onClick={addLogistics}>Add Logistics</button>
                    {/* <button onClick={handleChange}>Update Logistics</button>
                    <button onClick={deleteLogistics}>Delete Logistics</button> */}
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Supply Type</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Mission ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logistics.map((log) => (
                                <tr key={log.Logistics_ID}>
                                    <td>{log.Supply_Type}</td>
                                    <td>{log.Quantity}</td>
                                    <td>{log.Status}</td>
                                    <td>{log.Mission_ID}</td>
                                    <td>
                                        <button className="delete" onClick={() => deleteLogistics(log.Logistics_ID)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Logistics;
