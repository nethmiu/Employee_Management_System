import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:8070/leave/readall');
                if (response.status === 200) {
                    setLeaves(response.data); 
                } else {
                    throw new Error('Failed to fetch leave requests');
                }
            } catch (err) {
                setError('Error fetching leave data');
                console.error('Error fetching leaves:', err);
            }
        };

        fetchLeaves();
    }, []);

    
    const deleteLeave = async (leaveId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this leave request?');

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:8070/leave/delete1/${leaveId}`);
                if (response.status === 200) {
                    alert('Leave request deleted successfully.');
                    setLeaves(leaves.filter((leave) => leave._id !== leaveId)); 
                } else {
                    throw new Error('Failed to delete leave request');
                }
            } catch (err) {
                alert('Error deleting leave request. Please check the console for more details.');
                console.error('Error deleting leave:', err);
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', fontFamily: 'Montserrat', padding: '20px' }}>
            <h2>All Leave Requests</h2>
            {error ? <p>{error}</p> : null} 
            
            
            <div style={{ marginBottom: '20px' }}>
                <Link to="/pen">
                    <button
                        style={{
                            backgroundColor: '#00ACC1',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            borderRadius: '5px',
                            marginRight: '10px', 
                        }}
                    >
                        Pending Leaves
                    </button>
                </Link>
                <Link to="/app">
                    <button
                        style={{
                            backgroundColor: '#00ACC1',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            borderRadius: '5px',
                            marginRight: '10px', 
                        }}
                    >
                        Approved Leaves
                    </button>
                </Link>
                <Link to="/rej">
                    <button
                        style={{
                            backgroundColor: '#00ACC1',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            borderRadius: '5px',
                        }}
                    >
                        Rejected Leaves
                    </button>
                </Link>
            </div>

            <table className="table" style={{ color: 'white', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>ID</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Employee ID</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Leave Type</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Start Date</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>End Date</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Leave Status</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td style={{ padding: '10px' }}>{leave._id}</td>
                                <td style={{ padding: '10px' }}>{leave.employee_id}</td>
                                <td style={{ padding: '10px' }}>{leave.leave_type}</td>
                                <td style={{ padding: '10px' }}>{new Date(leave.start_date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px' }}>{new Date(leave.end_date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px' }}>{leave.leave_status}</td>
                                <td style={{ padding: '10px' }}>
                                    <Link to={`/leaves/update1/${leave._id}`}>
                                        <button
                                            className="btn"
                                            style={{
                                                backgroundColor: '#00ACC1',
                                                color: 'white',
                                                marginRight: '10px',
                                                padding: '10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Update Status
                                        </button>
                                    </Link>
                                    <button
                                        className="btn"
                                        onClick={() => deleteLeave(leave._id)}
                                        style={{
                                            backgroundColor: '#00ACC1',
                                            color: 'white',
                                            padding: '10px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ padding: '10px', textAlign: 'center' }}>No leave requests available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
