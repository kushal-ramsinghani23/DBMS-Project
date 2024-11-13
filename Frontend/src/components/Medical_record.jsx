// src/components/MedicalRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const MedicalRecord = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        Personnel_ID: '',
        Treatment_Date: '',
        Diagnosis: '',
        Treatment: '',
        Cost_of_Treatment: '',
        Treatment_Time: ''
    });

    useEffect(() => {
        fetchMedicalRecords();
    }, []);

    const fetchMedicalRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Medical_Record');
            setMedicalRecords(response.data);
        } catch (error) {
            console.error("Error fetching medical records:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecord((prev) => ({ ...prev, [name]: value }));
    };

    const addMedicalRecord = async () => {
        try {
            await axios.post('http://localhost:5000/Medical_Record', newRecord);
            setNewRecord({
                Personnel_ID: '',
                Treatment_Date: '',
                Diagnosis: '',
                Treatment: '',
                Cost_of_Treatment: '',
                Treatment_Time: ''
            });
            fetchMedicalRecords();
        } catch (error) {
            console.error("Error adding new medical record:", error);
        }
    };

    const deleteMedicalRecord = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Medical_Record/${id}`);
            fetchMedicalRecords();
        } catch (error) {
            console.error("Error deleting medical record:", error);
        }
    };

    return (
        <div className='center-div'>
            <div className="main-card">
            <h2>Medical Records</h2>
            <div className="form-group">
                <input
                    type="number"
                    name="Personnel_ID"
                    placeholder="Personnel ID"
                    value={newRecord.Personnel_ID}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Treatment_Date"
                    placeholder="Treatment Date"
                    value={newRecord.Treatment_Date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Diagnosis"
                    placeholder="Diagnosis"
                    value={newRecord.Diagnosis}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Treatment"
                    placeholder="Treatment"
                    value={newRecord.Treatment}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="Cost_of_Treatment"
                    placeholder="Cost of Treatment"
                    value={newRecord.Cost_of_Treatment}
                    onChange={handleChange}
                />
                <input
                    type="time"
                    name="Treatment_Time"
                    placeholder="Treatment Time"
                    value={newRecord.Treatment_Time}
                    onChange={handleChange}
                />
                <button onClick={addMedicalRecord}>Add Medical Record</button>
                {/* <button onClick={handleChange}>Update Medical Record</button>
                <button onClick={deleteMedicalRecord}>Delete Medical Record</button> */}
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Personnel ID</th>
                            <th>Treatment Date</th>
                            <th>Diagnosis</th>
                            <th>Treatment</th>
                            <th>Cost of Treatment</th>
                            <th>Treatment Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecords.map((record) => (
                            <tr key={record.Record_ID}>
                                <td>{record.Personnel_ID}</td>
                                <td>{record.Treatment_Date}</td>
                                <td>{record.Diagnosis}</td>
                                <td>{record.Treatment}</td>
                                <td>{record.Cost_of_Treatment}</td>
                                <td>{record.Treatment_Time}</td>
                                <td>
                                    <button className="delete" onClick={() => deleteMedicalRecord(record.Record_ID)}>Delete</button>
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

export default MedicalRecord;
