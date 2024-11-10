// src/components/Operation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Operation = () => {
    const [operations, setOperations] = useState([]);
    const [newOperation, setNewOperation] = useState({
        Operation_Name: '',
        Start_Date: '',
        End_Date: ''
    });

    useEffect(() => {
        fetchOperations();
    }, []);

    const fetchOperations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Operation');
            setOperations(response.data);
        } catch (error) {
            console.error("Error fetching operations:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOperation((prev) => ({ ...prev, [name]: value }));
    };

    const addOperation = async () => {
        try {
            await axios.post('http://localhost:5000/Operation', newOperation);
            setNewOperation({
                Operation_Name: '',
                Start_Date: '',
                End_Date: ''
            });
            fetchOperations();
        } catch (error) {
            console.error("Error adding new operation:", error);
        }
    };

    const deleteOperation = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Operation/${id}`);
            fetchOperations();
        } catch (error) {
            console.error("Error deleting operation:", error);
        }
    };

    return (

        <div className='center-div'>
            <div className="main-card">
            <h2>Operations</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="Operation_Name"
                    placeholder="Operation Name"
                    value={newOperation.Operation_Name}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Start_Date"
                    placeholder="Start Date"
                    value={newOperation.Start_Date}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="End_Date"
                    placeholder="End Date"
                    value={newOperation.End_Date}
                    onChange={handleChange}
                />
                <button onClick={addOperation}>Add Operation</button>
                <button onClick={handleChange}>Update Operation</button>
                    <button onClick={deleteOperation}>Delete Operation</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Operation Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            <tr key={operation.Operation_ID}>
                                <td>{operation.Operation_Name}</td>
                                <td>{operation.Start_Date}</td>
                                <td>{operation.End_Date}</td>
                                <td>
                                    <button className="delete" onClick={() => deleteOperation(operation.Operation_ID)}>Delete</button>
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

export default Operation;
