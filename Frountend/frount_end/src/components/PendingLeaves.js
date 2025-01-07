import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingLeaves = () => {
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingLeaves = async () => {
            try {
                const response = await axios.get("http://localhost:8070/leave/pen/"); 
                setPendingLeaves(response.data.pendingLeaves);
            } catch (err) {
                setError(err.response?.data?.status || "Error fetching pending leaves");
            }
        };

        fetchPendingLeaves();
    }, []);

    return (
        <div style={{ backgroundColor: '#121212', color: '#fff', padding: '20px' }}>
            <h2>Pending Leave Requests</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {pendingLeaves.length === 0 ? (
                <p>No pending leave requests found.</p>
            ) : (
                <ul>
                    {pendingLeaves.map((leave) => (
                        <li key={leave._id} style={{ marginBottom: '10px' }}>
                            <strong>Employee ID:</strong> {leave.employee_id} <br />
                            <strong>Leave Type:</strong> {leave.leave_type} <br />
                            <strong>Start Date:</strong> {new Date(leave.start_date).toLocaleDateString()} <br />
                            <strong>End Date:</strong> {new Date(leave.end_date).toLocaleDateString()} <br />
                            <strong>Status:</strong> {leave.leave_status} <br />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingLeaves;
