// src/components/Training.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTraining((prev) => ({ ...prev, [name]: value }));
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

    const deleteTraining = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Training/${id}`);
            fetchTraining();
        } catch (error) {
            console.error("Error deleting training:", error);
        }
    };

    return (

        <div className='center-div'>
            <div className="main-card">
            <h2>Training Programs</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="Program_Name"
                    placeholder="Program Name"
                    value={newTraining.Program_Name}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Start_Date"
                    placeholder="Start Date"
                    value={newTraining.Start_Date}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="Duration_Weeks"
                    placeholder="Duration (Weeks)"
                    value={newTraining.Duration_Weeks}
                    onChange={handleChange}
                />
                <button onClick={addTraining}>Add Training</button>
                <button onClick={handleChange}>Update Training</button>
                    <button onClick={deleteTraining}>Delete Training</button>
            </div>

            <div className="table-container">
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
                                    <button className="delete" onClick={() => deleteTraining(train.Training_ID)}>Delete</button>
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

export default Training;
