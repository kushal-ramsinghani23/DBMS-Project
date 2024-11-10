// src/components/Vehicle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({
        Model: '',
        Type: '',
        Status: '',
        Unit_ID: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Vehicle');
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const addVehicle = async () => {
        try {
            await axios.post('http://localhost:5000/Vehicle', newVehicle);
            setNewVehicle({
                Model: '',
                Type: '',
                Status: '',
                Unit_ID: ''
            });
            fetchVehicles();
        } catch (error) {
            console.error("Error adding new vehicle:", error);
        }
    };

    const deleteVehicle = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Vehicle/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    return (

        <div className='center-div'>
            <div className="main-card">
            <h2>Vehicles</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="Model"
                    placeholder="Model"
                    value={newVehicle.Model}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Type"
                    placeholder="Type"
                    value={newVehicle.Type}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Status"
                    placeholder="Status"
                    value={newVehicle.Status}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="Unit_ID"
                    placeholder="Unit ID"
                    value={newVehicle.Unit_ID}
                    onChange={handleChange}
                />
                <button onClick={addVehicle}>Add Vehicle</button>
                <button onClick={handleChange}>Update Vehicle</button>
                <button onClick={deleteVehicle}>Delete Vehicle</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Unit ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.Vehicle_ID}>
                                <td>{vehicle.Model}</td>
                                <td>{vehicle.Type}</td>
                                <td>{vehicle.Status}</td>
                                <td>{vehicle.Unit_ID}</td>
                                <td>
                                    <button className="delete" onClick={() => deleteVehicle(vehicle.Vehicle_ID)}>Delete</button>
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

export default Vehicle;
