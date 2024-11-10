import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [units, setUnits] = useState([]);
    const [newUnit, setNewUnit] = useState({ Unit_Name: '', Unit_Type: '', Base_Location: '' });

    useEffect(() => {
    fetchUnits();
    }, []);

    const fetchUnits = async () => {
    const response = await axios.get('http://localhost:5555/api/unit');
    setUnits(response.data);
    };

    const addUnit = async () => {
    await axios.post('http://localhost:5555/api/unit', newUnit);
    fetchUnits();
    };

    const deleteUnit = async (id) => {
    await axios.delete(`http://localhost:5555/api/unit/${id}`);
    fetchUnits();
    };

    const updateUnit = async (id) => {
    await axios.put(`http://localhost:5000/api/unit/${id}`, newUnit);
    fetchUnits();
    };

    return (
    <div className="App">
        <h1>Military Units Dashboard</h1>
        <h2>Manage Units</h2>
        <div>
        <input
            type="text"
            placeholder="Unit Name"
            value={newUnit.Unit_Name}
            onChange={(e) => setNewUnit({ ...newUnit, Unit_Name: e.target.value })}
        />
        <input
            type="text"
            placeholder="Unit Type"
            value={newUnit.Unit_Type}
            onChange={(e) => setNewUnit({ ...newUnit, Unit_Type: e.target.value })}
        />
        <input
            type="text"
            placeholder="Base Location"
            value={newUnit.Base_Location}
            onChange={(e) => setNewUnit({ ...newUnit, Base_Location: e.target.value })}
        />
            <button onClick={addUnit}>Add Unit</button>
        </div>
        <div>
        <h3>Unit List</h3>
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
                    <button onClick={() => deleteUnit(unit.Unit_ID)}>Delete</button>
                    <button onClick={() => updateUnit(unit.Unit_ID)}>Update</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
}

export default App;