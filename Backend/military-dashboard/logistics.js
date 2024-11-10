// src/components/Logistics.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const updateLogistics = async (id, updatedLogistics) => {
        try {
            await axios.put(`http://localhost:5000/Logistics/${id}`, updatedLogistics);
            fetchLogistics();
        } catch (error) {
            console.error("Error updating logistics:", error);
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
        <div>
            <h2>Logistics</h2>
            <input
                type="text"
                placeholder="Supply Type"
                value={newLogistics.Supply_Type}
                onChange={(e) => setNewLogistics({ ...newLogistics, Supply_Type: e.target.value })}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={newLogistics.Quantity}
                onChange={(e) => setNewLogistics({ ...newLogistics, Quantity: e.target.value })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newLogistics.Status}
                onChange={(e) => setNewLogistics({ ...newLogistics, Status: e.target.value })}
            />
            <input
                type="number"
                placeholder="Mission ID"
                value={newLogistics.Mission_ID}
                onChange={(e) => setNewLogistics({ ...newLogistics, Mission_ID: e.target.value })}
            />
            <button onClick={addLogistics}>Add Logistics</button>

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
                                <button onClick={() => updateLogistics(log.Logistics_ID, newLogistics)}>Update</button>
                                <button onClick={() => deleteLogistics(log.Logistics_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logistics;
