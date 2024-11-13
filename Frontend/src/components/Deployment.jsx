// src/components/Deployment.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Deployment = () => {
    const [deployments, setDeployments] = useState([]);
    const [newDeployment, setNewDeployment] = useState({
        Personnel_ID: '',
        Location: '',
        Start_Date: '',
        End_Date: '',
        Deployment_Duration_Days: ''
    });

    useEffect(() => {
        fetchDeployments();
    }, []);

    const fetchDeployments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Deployment');
            setDeployments(response.data);
        } catch (error) {
            console.error("Error fetching deployment data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDeployment((prev) => ({ ...prev, [name]: value }));
    };

    const addDeployment = async () => {
        try {
            await axios.post('http://localhost:5000/Deployment', newDeployment);
            setNewDeployment({
                Personnel_ID: '',
                Location: '',
                Start_Date: '',
                End_Date: '',
                Deployment_Duration_Days: ''
            });
            fetchDeployments();
        } catch (error) {
            console.error("Error adding new deployment:", error);
        }
    };

    const updateDeployment = async (id, updatedDeployment) => {
        try {
            await axios.put(`http://localhost:5000/Deployment/${id}`, updatedDeployment);
            fetchDeployments();
        } catch (error) {
            console.error("Error updating deployment:", error);
        }
    };

    const deleteDeployment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Deployment/${id}`);
            fetchDeployments();
        } catch (error) {
            console.error("Error deleting deployment:", error);
        }
    };

    return (
        <div className='center-div'>
            <div className="main-card">
                <h2>Deployments</h2>
                <div className="form-group">
                    <input
                        type="number"
                        name="Personnel_ID"
                        placeholder="Personnel ID"
                        value={newDeployment.Personnel_ID}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="Location"
                        placeholder="Location"
                        value={newDeployment.Location}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="Start_Date"
                        placeholder="Start Date"
                        value={newDeployment.Start_Date}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="End_Date"
                        placeholder="End Date"
                        value={newDeployment.End_Date}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="Deployment_Duration_Days"
                        placeholder="Duration (days)"
                        value={newDeployment.Deployment_Duration_Days}
                        onChange={handleChange}
                    />
                    <button onClick={addDeployment}>Add Deployment</button>
                    {/* <button onClick={handleChange}>Update Deployment</button>
                    <button onClick={deleteDeployment}>Delete Deployment</button> */}
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Personnel ID</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Duration (days)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deployments.map((deployment) => (
                                <tr key={deployment.Deployment_ID}>
                                    <td>{deployment.Personnel_ID}</td>
                                    <td>{deployment.Location}</td>
                                    <td>{deployment.Start_Date}</td>
                                    <td>{deployment.End_Date}</td>
                                    <td>{deployment.Deployment_Duration_Days}</td>
                                    <td>
                                        <button
                                            className="update"
                                            onClick={() => updateDeployment(deployment.Deployment_ID, newDeployment)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => deleteDeployment(deployment.Deployment_ID)}
                                        >
                                            Delete
                                        </button>
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

export default Deployment;
