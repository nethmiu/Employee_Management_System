import React, { useState } from 'react';
import axios from 'axios';

export default function GetOneEmpAttendance() {
    const [employeeId, setEmployeeId] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const fetchAttendanceRecords = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8070/attendance/read2/${employeeId}`);

            if (response.status === 200) {
                setAttendanceRecords(response.data.attendanceRecords);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.status);
            } else {
                setError('Error fetching attendance records. Please try again.');
            }
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Get Attendance Using Employee ID</h2>
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
                <center><button
                    type="button"
                    style={styles.button}
                    onClick={fetchAttendanceRecords}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'View Records'}
                </button></center>
            </div>

            
            {error && <p style={styles.errorMessage}>{error}</p>}

            
            {attendanceRecords.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Employee ID</th>
                            <th style={styles.th}>Check-In Time</th>
                            <th style={styles.th}>Check-Out Time</th>
                            <th style={styles.th}>Work Duration (Hours)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record) => (
                            <tr key={record._id}>
                                <td style={styles.td}>{record.employee_id}</td>
                                <td style={styles.td}>{new Date(record.check_in_time).toLocaleString()}</td>
                                <td style={styles.td}>{record.check_out_time ? new Date(record.check_out_time).toLocaleString() : 'N/A'}</td>
                                <td style={styles.td}>{record.work_duration_hours || 'N/A'}</td>
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
        border: '1px solid #555', 
        borderRadius: '4px',
        width: '100%',
        color: '#fff', 
        backgroundColor: '#1c1c1c', 
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
        textAlign:'center',
    },
    errorMessage: {
        color: '#ff5555', 
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
    },
};
