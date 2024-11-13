// src/components/Operation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
const port = 9800;

const Operation = () => {
    const [operations, setOperations] = useState([]);
    const [newOperation, setNewOperation] = useState({
        Operation_Name: '',
        Start_Date: '',
        End_Date: ''
    });
    const [editingId, setEditingId] = useState(null); // Track the ID of the operation being edited

    useEffect(() => {
        fetchOperations();
    }, []);

    const fetchOperations = async () => {
        try {
            const response = await axios.get(`http://localhost:${port}/api/operation`);
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
            const response = await axios.post(`http://localhost:${port}/api/operation`, newOperation);
            setOperations((prev) => [...prev, response.data]);
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
            await axios.delete(`http://localhost:${port}/api/operation/${id}`);
            setOperations((prev) => prev.filter((operation) => operation.Operation_ID !== id));
            console.log("Operation deleted successfully");
        } catch (error) {
            console.error("Error deleting operation:", error);
        }
    };

    const editOperation = async () => {
        try {
            const response = await axios.put(`http://localhost:${port}/api/operation/${editingId}`, newOperation);
            setOperations((prev) =>
                prev.map((operation) =>
                    operation.Operation_ID === editingId ? { ...operation, ...newOperation } : operation
                )
            );
            setEditingId(null); // Exit editing mode
            setNewOperation({ Operation_Name: '', Start_Date: '', End_Date: '' });
        } catch (error) {
            console.error("Error updating operation:", error);
        }
    };

    const startEditing = (operation) => {
        setEditingId(operation.Operation_ID);
        setNewOperation({
            Operation_Name: operation.Operation_Name,
            Start_Date: operation.Start_Date,
            End_Date: operation.End_Date,
        });
    };

    return (
        <div className='center-div'>
            <div className="main-card">
                <h2>Operations</h2>
                <div className="form-group">
                    {['Operation_Name', 'Start_Date', 'End_Date'].map((field) => (
                        <input
                            key={field}
                            type={field.includes('Date') ? 'date' : 'text'}
                            name={field}
                            placeholder={field.replace('_', ' ')}
                            value={newOperation[field]}
                            onChange={handleChange}
                        />
                    ))}
                    {editingId ? (
                        <button onClick={editOperation}>Update Operation</button>
                    ) : (
                        <button onClick={addOperation}>Add Operation</button>
                    )}
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
                                        <button onClick={() => startEditing(operation)}>Edit</button>
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
