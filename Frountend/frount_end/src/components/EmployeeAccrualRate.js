import React, { useState } from 'react';
import axios from 'axios';

export default function EmployeeAccrualRate() {
    const [employeeId, setEmployeeId] = useState('');
    const [accrualRate, setAccrualRate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const fetchAccrualRate = async () => {
        setError('');
        setLoading(true);
        setAccrualRate('');

        try {
            const response = await axios.get(`http://localhost:8070/leave/acc/${employeeId}`);
            if (response.status === 200) {
                setAccrualRate(response.data.accrualRateDaysPerMonth);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.status);
            } else {
                setError('Error fetching leave accrual rate. Please try again.');
            }
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Employee Leave Accrual Rate</h2>
            <div style={styles.inputContainer}>
                <label htmlFor="employeeId" style={styles.label}>Employee ID:</label>
                <input
                    type="text"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={styles.input}
                    placeholder="Enter Employee ID"
                />
            </div>

            <button style={styles.button} onClick={fetchAccrualRate} disabled={loading}>
                {loading ? 'Loading...' : 'Get Accrual Rate'}
            </button>

            {error && <p style={styles.errorMessage}>{error}</p>}
            {accrualRate && <p style={styles.successMessage}>Accrual Rate: {accrualRate}</p>}
        </div>
    );
}


const styles = {
    container: {
        backgroundColor: '#121212',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    inputContainer: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        marginBottom: '10px',
        fontSize: '1.2rem',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        width: '250px',
    },
    button: {
        backgroundColor: '#00ACC1',
        color: '#121212',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        marginTop: '20px',
    },
    successMessage: {
        color: 'green',
        marginTop: '20px',
    },
};
