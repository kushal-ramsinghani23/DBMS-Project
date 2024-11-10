// src/components/IntelligenceReport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const IntelligenceReport = () => {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        Operation_ID: '',
        Report_Date: '',
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Intelligence_Report');
            setReports(response.data);
        } catch (error) {
            console.error("Error fetching intelligence reports:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReport((prev) => ({ ...prev, [name]: value }));
    };

    const addReport = async () => {
        try {
            await axios.post('http://localhost:5000/Intelligence_Report', newReport);
            setNewReport({
                Operation_ID: '',
                Report_Date: '',
            });
            fetchReports();
        } catch (error) {
            console.error("Error adding new intelligence report:", error);
        }
    };

    const updateReport = async (id, updatedReport) => {
        try {
            await axios.put(`http://localhost:5000/Intelligence_Report/${id}`, updatedReport);
            fetchReports();
        } catch (error) {
            console.error("Error updating intelligence report:", error);
        }
    };

    const deleteReport = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Intelligence_Report/${id}`);
            fetchReports();
        } catch (error) {
            console.error("Error deleting intelligence report:", error);
        }
    };

    return (
        <div className='center-div'>
            <div className="main-card">
            <h2>Intelligence Reports</h2>
            <div className="form-group">
                <input
                    type="number"
                    name="Operation_ID"
                    placeholder="Operation ID"
                    value={newReport.Operation_ID}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Report_Date"
                    placeholder="Report Date"
                    value={newReport.Report_Date}
                    onChange={handleChange}
                />
                <button onClick={addReport}>Add Intelligence Report</button>
                <button onClick={handleChange}>Update Intelligence Report</button>
                    <button onClick={deleteReport}>Delete Intelligence Report</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Operation ID</th>
                            <th>Report Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.Report_ID}>
                                <td>{report.Operation_ID}</td>
                                <td>{report.Report_Date}</td>
                                <td>
                                    <button
                                        className="update"
                                        onClick={() => updateReport(report.Report_ID, newReport)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => deleteReport(report.Report_ID)}
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

export default IntelligenceReport;
