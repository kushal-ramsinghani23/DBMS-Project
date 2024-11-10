// src/components/Personnel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

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
            const response = await axios.get('http://localhost:4000/Personnel');
            setPersonnel(response.data);
        } catch (error) {
            console.error("Error fetching personnel:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPersonnel((prev) => ({ ...prev, [name]: value }));
    };

    const addPersonnel = async () => {
        try {
            await axios.post('http://localhost:4000/api/personnel', newPersonnel);
            setPersonnel((prev) => [...prev, response.data]); 
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

    const deletePersonnel = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/Personnel/${id}`);
            fetchPersonnel();
        } catch (error) {
            console.error("Error deleting personnel:", error);
        }
    };

    return (

        <div className='center-div'>
            <div className="main-card">
            <h2>Personnel Table</h2>
            <div className="form-group">
                {['Name', 'Rank_Title', 'Years_of_Service', 'Date_Of_Birth'].map((field) => (
                    <input
                        key={field}
                        type={field === 'Years_of_Service' ? 'number' : field === 'Date_Of_Birth' ? 'date' : 'text'}
                        name={field}
                        placeholder={field.replace('_', ' ')}
                        value={newPersonnel[field]}
                        onChange={handleChange}
                    />
                ))}
                <button onClick={addPersonnel}>Add Personnel</button>
                <button onClick={handleChange}>Update Personnel</button>
                <button onClick={deletePersonnel}>Delete Personnel</button>
            </div>

            <div className="table-container">
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
                                    <button className="delete" onClick={() => deletePersonnel(person.Personnel_ID)}>Delete</button>
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

export default Personnel;
