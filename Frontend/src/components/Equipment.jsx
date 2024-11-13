// src/components/Equipment.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [newEquipment, setNewEquipment] = useState({
        Name: '',
        Type: '',
        Status: '',
        Unit_ID: ''
    });

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Equipment');
            setEquipment(response.data);
        } catch (error) {
            console.error("Error fetching equipment data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEquipment((prev) => ({ ...prev, [name]: value }));
    };

    const addEquipment = async () => {
        try {
            await axios.post('http://localhost:5000/Equipment', newEquipment);
            setNewEquipment({
                Name: '',
                Type: '',
                Status: '',
                Unit_ID: ''
            });
            fetchEquipment();
        } catch (error) {
            console.error("Error adding new equipment:", error);
        }
    };

    const updateEquipment = async (id, updatedEquipment) => {
        try {
            await axios.put(`http://localhost:5000/Equipment/${id}`, updatedEquipment);
            fetchEquipment();
        } catch (error) {
            console.error("Error updating equipment:", error);
        }
    };

    const deleteEquipment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Equipment/${id}`);
            fetchEquipment();
        } catch (error) {
            console.error("Error deleting equipment:", error);
        }
    };

    return (
        <div className='center-div'>
            <div className="main-card">
            <h2>Equipment</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={newEquipment.Name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Type"
                    placeholder="Type"
                    value={newEquipment.Type}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Status"
                    placeholder="Status"
                    value={newEquipment.Status}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="Unit_ID"
                    placeholder="Unit ID"
                    value={newEquipment.Unit_ID}
                    onChange={handleChange}
                />
                <button onClick={addEquipment}>Add Equipment</button>
                {/* <button onClick={handleChange}>Update Equipment</button>
                <button onClick={deleteEquipment}>Delete Equipment</button> */}
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Unit ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipment.map((item) => (
                            <tr key={item.Equipment_ID}>
                                <td>{item.Name}</td>
                                <td>{item.Type}</td>
                                <td>{item.Status}</td>
                                <td>{item.Unit_ID}</td>
                                <td>
                                    <button
                                        className="delete"
                                        onClick={() => updateEquipment(item.Equipment_ID, newEquipment)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => deleteEquipment(item.Equipment_ID)}
                                    >
                                        Delete
                                    </button>
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

export default Equipment;
