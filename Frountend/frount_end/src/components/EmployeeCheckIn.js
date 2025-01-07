import React, { useState } from 'react';
import axios from 'axios';

export default function EmployeeCheckIn() {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    
    const handleCheckIn = async (e) => {
        e.preventDefault();
        setMessage(''); 
        setError('');   

        try {
            
            const response = await axios.post('http://localhost:8070/attendance/checkin', {
                employee_id: employeeId
            });

            
            if (response.status === 200) {
                setMessage(response.data.message); 
            }
        } catch (err) {
            
            if (err.response) {
                setError(err.response.data.status); 
            } else {
                setError('Error occurred during check-in. Please try again.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Employee Check-In</h2>
            <form onSubmit={handleCheckIn} style={styles.form}>
                <div className="form-group" style={styles.formGroup}>
                    <label htmlFor="employeeId" style={styles.label}>Employee ID:</label>
                    <input
                        type="text"
                        id="employeeId"
                        className="form-control"
                        style={styles.input}
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Check In</button>
            </form>

            
            {message && <p style={styles.successMessage}>{message}</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
        </div>
    );
}


const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #333', 
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
        backgroundColor: '#121212', 
        fontFamily: 'Montserrat, sans-serif', 
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#fff', 
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
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
    successMessage: {
        color: 'green',
        marginTop: '10px',
    },
    errorMessage: {
        color: 'red',
        marginTop: '10px',
    },
};
