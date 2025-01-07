import React, { useState } from 'react';
import axios from 'axios';

export default function RejectedLeaves() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rejectedLeaves, setRejectedLeaves] = useState([]);
    const [error, setError] = useState(null);

    const fetchRejectedLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/leave/rej`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });

            if (response.status === 200) {
                setRejectedLeaves(response.data.rejectedLeaves);
                setError(null); 
            } else {
                throw new Error('Failed to fetch rejected leave requests');
            }
        } catch (err) {
            setError('Error fetching rejected leaves: ' + err.message);
            console.error('Error fetching rejected leaves:', err);
        }
    };

    return (
        <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', fontFamily: 'Montserrat', padding: '20px' }}>
            <h2>Rejected Leave Requests</h2>
            <div>
                <label style={{ marginRight: '10px' }}>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginRight: '20px', padding: '5px' }}
                />
                <label style={{ marginRight: '10px' }}>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginRight: '20px', padding: '5px' }}
                />
                <button
                    onClick={fetchRejectedLeaves}
                    style={{
                        backgroundColor: '#00ACC1',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    View Rejected Leaves
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>} 

            <h3>Rejected Leave Requests</h3>
            <table className="table" style={{ color: 'white', width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>ID</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Employee ID</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Leave Type</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Start Date</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>End Date</th>
                        <th style={{ borderBottom: '2px solid white', padding: '10px' }}>Leave Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rejectedLeaves.length > 0 ? (
                        rejectedLeaves.map((leave) => (
                            <tr key={leave._id}>
                                <td style={{ padding: '10px' }}>{leave._id}</td>
                                <td style={{ padding: '10px' }}>{leave.employee_id}</td>
                                <td style={{ padding: '10px' }}>{leave.leave_type}</td>
                                <td style={{ padding: '10px' }}>{new Date(leave.start_date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px' }}>{new Date(leave.end_date).toLocaleDateString()}</td>
                                <td style={{ padding: '10px' }}>{leave.leave_status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ padding: '10px', textAlign: 'center' }}>No rejected leave requests found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
