import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ Model: '', Type: '', Status: '', Unit_ID: '' });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const response = await axios.get('http://localhost:5000/Vehicle');
        setVehicles(response.data);
    };

    const addVehicle = async () => {
        await axios.post('http://localhost:5000/Vehicle', newVehicle);
        setNewVehicle({ Model: '', Type: '', Status: '', Unit_ID: '' });
        fetchVehicles();
    };

    const updateVehicle = async (id, updatedVehicle) => {
        await axios.put(`http://localhost:5000/Vehicle/${id}`, updatedVehicle);
        fetchVehicles();
    };

    const deleteVehicle = async (id) => {
        await axios.delete(`http://localhost:5000/Vehicle/${id}`);
        fetchVehicles();
    };

    return (
        <div>
            <h2>Vehicles</h2>
            <input
                type="text"
                placeholder="Model"
                value={newVehicle.Model}
                onChange={(e) => setNewVehicle({ ...newVehicle, Model: e.target.value })}
            />
            <input
                type="text"
                placeholder="Type"
                value={newVehicle.Type}
                onChange={(e) => setNewVehicle({ ...newVehicle, Type: e.target.value })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newVehicle.Status}
                onChange={(e) => setNewVehicle({ ...newVehicle, Status: e.target.value })}
            />
            <input
                type="number"
                placeholder="Unit ID"
                value={newVehicle.Unit_ID}
                onChange={(e) => setNewVehicle({ ...newVehicle, Unit_ID: e.target.value })}
            />
            <button onClick={addVehicle}>Add Vehicle</button>

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
                                <button onClick={() => updateVehicle(vehicle.Vehicle_ID, newVehicle)}>Update</button>
                                <button onClick={() => deleteVehicle(vehicle.Vehicle_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vehicle;
