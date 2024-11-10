// src/components/Training.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Training = () => {
    const [training, setTraining] = useState([]);
    const [newTraining, setNewTraining] = useState({
        Program_Name: '',
        Start_Date: '',
        Duration_Weeks: ''
    });

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Training');
            setTraining(response.data);
        } catch (error) {
            console.error("Error fetching training programs:", error);
        }
    };

    const addTraining = async () => {
        try {
            await axios.post('http://localhost:5000/Training', newTraining);
            setNewTraining({
                Program_Name: '',
                Start_Date: '',
                Duration_Weeks: ''
            });
            fetchTraining();
        } catch (error) {
            console.error("Error adding new training:", error);
        }
    };

    const updateTraining = async (id, updatedTraining) => {
        try {
            await axios.put(`http://localhost:5000/Training/${id}`, updatedTraining);
            fetchTraining();
        } catch (error) {
            console.error("Error updating training:", error);
        }
    };

    const deleteTraining = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Training/${id}`);
            fetchTraining();
        } catch (error) {
            console.error("Error deleting training:", error);
        }
    };

    return (
        <div>
            <h2>Training Programs</h2>
            <input
                type="text"
                placeholder="Program Name"
                value={newTraining.Program_Name}
                onChange={(e) => setNewTraining({ ...newTraining, Program_Name: e.target.value })}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={newTraining.Start_Date}
                onChange={(e) => setNewTraining({ ...newTraining, Start_Date: e.target.value })}
            />
            <input
                type="number"
                placeholder="Duration (Weeks)"
                value={newTraining.Duration_Weeks}
                onChange={(e) => setNewTraining({ ...newTraining, Duration_Weeks: e.target.value })}
            />
            <button onClick={addTraining}>Add Training</button>

            <table>
                <thead>
                    <tr>
                        <th>Program Name</th>
                        <th>Start Date</th>
                        <th>Duration (Weeks)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {training.map((train) => (
                        <tr key={train.Training_ID}>
                            <td>{train.Program_Name}</td>
                            <td>{train.Start_Date}</td>
                            <td>{train.Duration_Weeks}</td>
                            <td>
                                <button onClick={() => updateTraining(train.Training_ID, newTraining)}>Update</button>
                                <button onClick={() => deleteTraining(train.Training_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Training;
