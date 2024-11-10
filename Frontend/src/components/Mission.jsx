// src/components/Mission.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [newMission, setNewMission] = useState({
        Mission_Name: '',
        Objective: '',
        Start_Date: '',
        End_Date: '',
        Operation_ID: ''
    });

    useEffect(() => {
        fetchMissions();
    }, []);

    const fetchMissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Mission');
            setMissions(response.data);
        } catch (error) {
            console.error("Error fetching missions:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMission((prev) => ({ ...prev, [name]: value }));
    };

    const addMission = async () => {
        try {
            await axios.post('http://localhost:5000/Mission', newMission);
            setNewMission({
                Mission_Name: '',
                Objective: '',
                Start_Date: '',
                End_Date: '',
                Operation_ID: ''
            });
            fetchMissions();
        } catch (error) {
            console.error("Error adding new mission:", error);
        }
    };

    const deleteMission = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Mission/${id}`);
            fetchMissions();
        } catch (error) {
            console.error("Error deleting mission:", error);
        }
    };

    return (

        <div className='center-div'>
            <div className="main-card">
            <h2>Missions</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="Mission_Name"
                    placeholder="Mission Name"
                    value={newMission.Mission_Name}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name="Objective"
                    placeholder="Objective"
                    value={newMission.Objective}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Start_Date"
                    placeholder="Start Date"
                    value={newMission.Start_Date}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="End_Date"
                    placeholder="End Date"
                    value={newMission.End_Date}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="Operation_ID"
                    placeholder="Operation ID"
                    value={newMission.Operation_ID}
                    onChange={handleChange}
                />
                <button onClick={addMission}>Add Mission</button>
                <button onClick={handleChange}>Update Mission</button>
                <button onClick={deleteMission}>Delete Mission</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Mission Name</th>
                            <th>Objective</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Operation ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map((mission) => (
                            <tr key={mission.Mission_ID}>
                                <td>{mission.Mission_Name}</td>
                                <td>{mission.Objective}</td>
                                <td>{mission.Start_Date}</td>
                                <td>{mission.End_Date}</td>
                                <td>{mission.Operation_ID}</td>
                                <td>
                                    <button className="delete" onClick={() => deleteMission(mission.Mission_ID)}>Delete</button>
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

export default Mission;
