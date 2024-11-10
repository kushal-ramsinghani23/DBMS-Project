// src/components/Deployment.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Deployments</h2>
            <input
                type="number"
                placeholder="Personnel ID"
                value={newDeployment.Personnel_ID}
                onChange={(e) => setNewDeployment({ ...newDeployment, Personnel_ID: e.target.value })}
            />
            <input
                type="text"
                placeholder="Location"
                value={newDeployment.Location}
                onChange={(e) => setNewDeployment({ ...newDeployment, Location: e.target.value })}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={newDeployment.Start_Date}
                onChange={(e) => setNewDeployment({ ...newDeployment, Start_Date: e.target.value })}
            />
            <input
                type="date"
                placeholder="End Date"
                value={newDeployment.End_Date}
                onChange={(e) => setNewDeployment({ ...newDeployment, End_Date: e.target.value })}
            />
            <input
                type="number"
                placeholder="Duration (days)"
                value={newDeployment.Deployment_Duration_Days}
                onChange={(e) => setNewDeployment({ ...newDeployment, Deployment_Duration_Days: e.target.value })}
            />
            <button onClick={addDeployment}>Add Deployment</button>

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
                                <button onClick={() => updateDeployment(deployment.Deployment_ID, newDeployment)}>Update</button>
                                <button onClick={() => deleteDeployment(deployment.Deployment_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Deployment;
