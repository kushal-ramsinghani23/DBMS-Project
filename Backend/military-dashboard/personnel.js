// src/components/Personnel.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Personnel = () => {
    const [personnel, setPersonnel] = useState([]);
    const [newPersonnel, setNewPersonnel] = useState({
        Name: '',
        Rank_Title: '',
        Years_of_Service: '',
        Date_Of_Birth: ''
    });

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Personnel');
            setPersonnel(response.data);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        }
    };

    const addPersonnel = async () => {
        try {
            await axios.post('http://localhost:5000/Personnel', newPersonnel);
            setNewPersonnel({
                Name: '',
                Rank_Title: '',
                Years_of_Service: '',
                Date_Of_Birth: ''
            });
            fetchPersonnel();
        } catch (error) {
            console.error("Error adding new personnel:", error);
        }
    };

    const updatePersonnel = async (id, updatedPersonnel) => {
        try {
            await axios.put(`http://localhost:5000/Personnel/${id}`, updatedPersonnel);
            fetchPersonnel();
        } catch (error) {
            console.error("Error updating personnel:", error);
        }
    };

    const deletePersonnel = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Personnel/${id}`);
            fetchPersonnel();
        } catch (error) {
            console.error("Error deleting personnel:", error);
        }
    };

    return (
        <div>
            <h2>Personnel</h2>
            <input
                type="text"
                placeholder="Name"
                value={newPersonnel.Name}
                onChange={(e) => setNewPersonnel({ ...newPersonnel, Name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Rank Title"
                value={newPersonnel.Rank_Title}
                onChange={(e) => setNewPersonnel({ ...newPersonnel, Rank_Title: e.target.value })}
            />
            <input
                type="number"
                placeholder="Years of Service"
                value={newPersonnel.Years_of_Service}
                onChange={(e) => setNewPersonnel({ ...newPersonnel, Years_of_Service: e.target.value })}
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={newPersonnel.Date_Of_Birth}
                onChange={(e) => setNewPersonnel({ ...newPersonnel, Date_Of_Birth: e.target.value })}
            />
            <button onClick={addPersonnel}>Add Personnel</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rank Title</th>
                        <th>Years of Service</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {personnel.map((person) => (
                        <tr key={person.Personnel_ID}>
                            <td>{person.Name}</td>
                            <td>{person.Rank_Title}</td>
                            <td>{person.Years_of_Service}</td>
                            <td>{person.Date_Of_Birth}</td>
                            <td>
                                <button onClick={() => updatePersonnel(person.Personnel_ID, newPersonnel)}>Update</button>
                                <button onClick={() => deletePersonnel(person.Personnel_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Personnel;
