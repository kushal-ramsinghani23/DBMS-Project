// src/components/Unit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Unit = () => {
    const [units, setUnits] = useState([]);
    const [newUnit, setNewUnit] = useState({
        Unit_Name: '',
        Unit_Type: '',
        Base_Location: ''
    });

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/unit');
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
            await axios.post('http://localhost:5555/api/unit', newUnit);
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

    const deleteUnit = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/api/unit/${id}`);
            fetchUnits();
        } catch (error) {
            console.error("Error deleting unit:", error);
        }
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
                <button onClick={addUnit}>Add Unit</button>
                <button onClick={handleChange}>Update Unit</button>
                    <button onClick={deleteUnit}>Delete Unit</button>
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
