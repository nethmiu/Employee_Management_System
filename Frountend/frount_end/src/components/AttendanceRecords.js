import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function AttendanceRecords() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    
    const fetchAttendanceRecords = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:8070/attendance/read-all');
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

    
    const deleteAttendanceRecord = async (id) => {
        setError('');
        try {
            const response = await axios.delete(`http://localhost:8070/attendance/delete/${id}`);
            if (response.status === 200) {
                
                fetchAttendanceRecords();
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.status);
            } else {
                setError('Error deleting attendance record. Please try again.');
            }
        }
    };

    
    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    
    const handleViewAttendance = () => {
        navigate('/attone'); 
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Attendance Records</h2>

            
            {error && <p style={styles.errorMessage}>{error}</p>}
            {loading && <p>Loading...</p>}

            
            {attendanceRecords.length > 0 && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Employee ID</th>
                            <th style={styles.th}>Check-In Time</th>
                            <th style={styles.th}>Check-Out Time</th>
                            <th style={styles.th}>Work Duration (Hours)</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record) => (
                            <tr key={record._id}>
                                <td style={styles.td}>{record.employee_id}</td>
                                <td style={styles.td}>{new Date(record.check_in_time).toLocaleString()}</td>
                                <td style={styles.td}>{record.check_out_time ? new Date(record.check_out_time).toLocaleString() : 'N/A'}</td>
                                <td style={styles.td}>{record.work_duration_hours || 'N/A'}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => deleteAttendanceRecord(record._id)}
                                        style={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            
            <div style={styles.buttonContainer}>
                <br></br><br></br><button 
                    onClick={handleViewAttendance} 
                    style={styles.viewButton}
                >
                    View Employee Attendance Using Employee ID
                </button>
            </div>
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
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545', 
        color: '#fff', 
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    buttonContainer: {
        marginTop: '20px', 
        textAlign: 'center', 
    },
    viewButton: {
        padding: '10px 20px',
        backgroundColor: '#00ACC1', 
        color: '#fff', 
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
};
