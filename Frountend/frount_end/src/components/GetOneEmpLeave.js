import React, { useState } from 'react';
import axios from 'axios';

export default function FetchLeaveRequests() {
    const [employeeId, setEmployeeId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchLeaveRequests = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8070/leave/get1/${employeeId}`, {
                params: {
                    start_date: startDate,
                    end_date: endDate
                }
            });

            if (response.status === 200) {
                setLeaveRequests(response.data.leaveRequests);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.status);
            } else {
                setError('Error fetching leave requests. Please try again.');
            }
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Fetch Leave Requests</h2>
            <div style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="employeeId" style={styles.label}>Employee ID:</label>
                    <input
                        type="text"
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="startDate" style={styles.label}>Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="endDate" style={styles.label}>End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <button
                    type="button"
                    style={styles.button}
                    onClick={fetchLeaveRequests}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Fetch Requests'}
                </button>
            </div>

            
            {error && <p style={styles.errorMessage}>{error}</p>}

            
            {leaveRequests.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Employee ID</th>
                            <th style={styles.th}>Leave Type</th>
                            <th style={styles.th}>Start Date</th>
                            <th style={styles.th}>End Date</th>
                            <th style={styles.th}>Leave Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests.map((request) => (
                            <tr key={request._id}>
                                <td style={styles.td}>{request.employee_id}</td>
                                <td style={styles.td}>{request.leave_type}</td>
                                <td style={styles.td}>{new Date(request.start_date).toLocaleDateString()}</td>
                                <td style={styles.td}>{new Date(request.end_date).toLocaleDateString()}</td>
                                <td style={styles.td}>{request.leave_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '8px',
        backgroundColor: '#121212', 
        fontFamily: 'Montserrat, sans-serif', 
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#fff', 
    },
    form: {
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#fff', 
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        backgroundColor: '#333', 
        color: '#fff', 
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#00ACC1', 
        color: '#fff', 
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '10px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #333',
        padding: '8px',
        backgroundColor: '#00ACC1', 
        color: '#fff', 
        textAlign: 'left',
    },
    td: {
        border: '1px solid #333',
        padding: '8px',
        textAlign: 'left',
        color: '#fff', 
        backgroundColor: '#121212', 
    },
};
