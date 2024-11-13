// src/components/Unit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
const port = 9800;

const Unit = () => {
    const [units, setUnits] = useState([]);
    const [newUnit, setNewUnit] = useState({
        Unit_Name: '',
        Unit_Type: '',
        Base_Location: ''
    });
    const [editingId, setEditingId] = useState(null); // Track ID of the unit being edited

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/api/unit`);
            setUnits(response.data);
        } catch (error) {
            console.error("Error fetching units:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUnit((prev) => ({ ...prev, [name]: value }));
    };

    const addUnit = async () => {
        try {
            const response = await axios.post(`http://localhost:${port}/api/unit`, newUnit);
            setUnits((prev) => [...prev, response.data]);
            setNewUnit({
                Unit_Name: '',
                Unit_Type: '',
                Base_Location: ''
            });
            fetchUnits();
        } catch (error) {
            console.error("Error adding unit:", error);
        }
    };

    const editUnit = async () => {
        try {
            const res = await axios.put(`http://localhost:${port}/api/unit/${editingId}`, newUnit);
            setUnits((prev) =>
                prev.map((unit) => (unit.Unit_ID === editingId ? { ...unit, ...newUnit } : unit))
            );
            setEditingId(null); // Exit editing mode
            setNewUnit({ Unit_Name: '', Unit_Type: '', Base_Location: '' });
        } catch (error) {
            console.error("Error updating unit:", error);
        }
    };

    const deleteUnit = async (id) => {
        try {
            await axios.delete(`http://localhost:${port}/api/unit/${id}`);
            setUnits((prev) => prev.filter((unit) => unit.Unit_ID !== id));
        } catch (error) {
            console.error("Error deleting unit:", error);
        }
    };

    const startEditing = (unit) => {
        setEditingId(unit.Unit_ID);
        setNewUnit({
            Unit_Name: unit.Unit_Name,
            Unit_Type: unit.Unit_Type,
            Base_Location: unit.Base_Location
        });
    };

    return (
        <div className='center-div'>
            <div className="main-card">
                <h2>Unit Table</h2>
                <div className="form-group">
                    {['Unit_Name', 'Unit_Type', 'Base_Location'].map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field.replace('_', ' ')}
                            value={newUnit[field]}
                            onChange={handleChange}
                        />
                    ))}
                    {editingId ? (
                        <button onClick={editUnit}>Update Unit</button>
                    ) : (
                        <button onClick={addUnit}>Add Unit</button>
                    )}
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Unit Name</th>
                                <th>Unit Type</th>
                                <th>Base Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.map((unit) => (
                                <tr key={unit.Unit_ID}>
                                    <td>{unit.Unit_Name}</td>
                                    <td>{unit.Unit_Type}</td>
                                    <td>{unit.Base_Location}</td>
                                    <td>
                                        <button onClick={() => startEditing(unit)}>Edit</button>
                                        <button className="delete" onClick={() => deleteUnit(unit.Unit_ID)}>Delete</button>
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

export default Unit;
