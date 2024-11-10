// src/components/Operation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const updateOperation = async (id, updatedOperation) => {
        try {
            await axios.put(`http://localhost:5000/Operation/${id}`, updatedOperation);
            fetchOperations();
        } catch (error) {
            console.error("Error updating operation:", error);
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
        <div>
            <h2>Operations</h2>
            <input
                type="text"
                placeholder="Operation Name"
                value={newOperation.Operation_Name}
                onChange={(e) => setNewOperation({ ...newOperation, Operation_Name: e.target.value })}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={newOperation.Start_Date}
                onChange={(e) => setNewOperation({ ...newOperation, Start_Date: e.target.value })}
            />
            <input
                type="date"
                placeholder="End Date"
                value={newOperation.End_Date}
                onChange={(e) => setNewOperation({ ...newOperation, End_Date: e.target.value })}
            />
            <button onClick={addOperation}>Add Operation</button>

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
                                <button onClick={() => updateOperation(operation.Operation_ID, newOperation)}>Update</button>
                                <button onClick={() => deleteOperation(operation.Operation_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Operation;
