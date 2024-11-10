// src/components/Mission.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const updateMission = async (id, updatedMission) => {
        try {
            await axios.put(`http://localhost:5000/Mission/${id}`, updatedMission);
            fetchMissions();
        } catch (error) {
            console.error("Error updating mission:", error);
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
        <div>
            <h2>Missions</h2>
            <input
                type="text"
                placeholder="Mission Name"
                value={newMission.Mission_Name}
                onChange={(e) => setNewMission({ ...newMission, Mission_Name: e.target.value })}
            />
            <textarea
                placeholder="Objective"
                value={newMission.Objective}
                onChange={(e) => setNewMission({ ...newMission, Objective: e.target.value })}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={newMission.Start_Date}
                onChange={(e) => setNewMission({ ...newMission, Start_Date: e.target.value })}
            />
            <input
                type="date"
                placeholder="End Date"
                value={newMission.End_Date}
                onChange={(e) => setNewMission({ ...newMission, End_Date: e.target.value })}
            />
            <input
                type="number"
                placeholder="Operation ID"
                value={newMission.Operation_ID}
                onChange={(e) => setNewMission({ ...newMission, Operation_ID: e.target.value })}
            />
            <button onClick={addMission}>Add Mission</button>

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
                                <button onClick={() => updateMission(mission.Mission_ID, newMission)}>Update</button>
                                <button onClick={() => deleteMission(mission.Mission_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Mission;
