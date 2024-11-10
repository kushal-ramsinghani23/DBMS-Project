import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [newEquipment, setNewEquipment] = useState({ Name: '', Type: '', Status: '', Unit_ID: '' });

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

    const addEquipment = async () => {
        try {
            await axios.post('http://localhost:5000/Equipment', newEquipment);
            setNewEquipment({ Name: '', Type: '', Status: '', Unit_ID: '' });
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
        <div>
            <h2>Equipment</h2>
            <input
                type="text"
                placeholder="Name"
                value={newEquipment.Name}
                onChange={(e) => setNewEquipment({ ...newEquipment, Name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Type"
                value={newEquipment.Type}
                onChange={(e) => setNewEquipment({ ...newEquipment, Type: e.target.value })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newEquipment.Status}
                onChange={(e) => setNewEquipment({ ...newEquipment, Status: e.target.value })}
            />
            <input
                type="number"
                placeholder="Unit ID"
                value={newEquipment.Unit_ID}
                onChange={(e) => setNewEquipment({ ...newEquipment, Unit_ID: e.target.value })}
            />
            <button onClick={addEquipment}>Add Equipment</button>

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
                                <button onClick={() => updateEquipment(item.Equipment_ID, newEquipment)}>Update</button>
                                <button onClick={() => deleteEquipment(item.Equipment_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Equipment;
