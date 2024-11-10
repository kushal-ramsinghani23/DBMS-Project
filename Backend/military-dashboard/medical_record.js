// src/components/MedicalRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const updateMedicalRecord = async (id, updatedRecord) => {
        try {
            await axios.put(`http://localhost:5000/Medical_Record/${id}`, updatedRecord);
            fetchMedicalRecords();
        } catch (error) {
            console.error("Error updating medical record:", error);
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
        <div>
            <h2>Medical Records</h2>
            <input
                type="number"
                placeholder="Personnel ID"
                value={newRecord.Personnel_ID}
                onChange={(e) => setNewRecord({ ...newRecord, Personnel_ID: e.target.value })}
            />
            <input
                type="date"
                placeholder="Treatment Date"
                value={newRecord.Treatment_Date}
                onChange={(e) => setNewRecord({ ...newRecord, Treatment_Date: e.target.value })}
            />
            <input
                type="text"
                placeholder="Diagnosis"
                value={newRecord.Diagnosis}
                onChange={(e) => setNewRecord({ ...newRecord, Diagnosis: e.target.value })}
            />
            <input
                type="text"
                placeholder="Treatment"
                value={newRecord.Treatment}
                onChange={(e) => setNewRecord({ ...newRecord, Treatment: e.target.value })}
            />
            <input
                type="number"
                placeholder="Cost of Treatment"
                value={newRecord.Cost_of_Treatment}
                onChange={(e) => setNewRecord({ ...newRecord, Cost_of_Treatment: e.target.value })}
            />
            <input
                type="time"
                placeholder="Treatment Time"
                value={newRecord.Treatment_Time}
                onChange={(e) => setNewRecord({ ...newRecord, Treatment_Time: e.target.value })}
            />
            <button onClick={addMedicalRecord}>Add Medical Record</button>

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
                                <button onClick={() => updateMedicalRecord(record.Record_ID, newRecord)}>Update</button>
                                <button onClick={() => deleteMedicalRecord(record.Record_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalRecord;
