// src/components/IntelligenceReport.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h2>Intelligence Reports</h2>
            <input
                type="number"
                placeholder="Operation ID"
                value={newReport.Operation_ID}
                onChange={(e) => setNewReport({ ...newReport, Operation_ID: e.target.value })}
            />
            <input
                type="date"
                placeholder="Report Date"
                value={newReport.Report_Date}
                onChange={(e) => setNewReport({ ...newReport, Report_Date: e.target.value })}
            />
            <button onClick={addReport}>Add Intelligence Report</button>

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
                                <button onClick={() => updateReport(report.Report_ID, newReport)}>Update</button>
                                <button onClick={() => deleteReport(report.Report_ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IntelligenceReport;
