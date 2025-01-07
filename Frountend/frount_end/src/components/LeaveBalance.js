import React, { useState } from 'react';

export default function LeaveBalance() {
    const [employeeId, setEmployeeId] = useState('');
    const [leaveData, setLeaveData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`http://localhost:8070/leave/balance/${employeeId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.status);
            }

            setLeaveData(data);
        } catch (err) {
            setError(err.message);
            setLeaveData(null);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Check Leave Balance</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Get Leave Balance</button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
            {leaveData && (
                <div style={styles.result}>
                    <h2 style={styles.resultHeader}>Leave Balance Data</h2>
                    <p><strong>Annual Leave Balance:</strong> {leaveData.annual_leave_balance}</p>
                    <p><strong>No Pay Count:</strong> {leaveData.nopay_count}</p>
                </div>
            )}
        </div>
    );
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '36px',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #00ACC1',
        color: '#121212',
    },
    button: {
        padding: '10px',
        fontSize: '18px',
        backgroundColor: '#00ACC1',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    result: {
        marginTop: '20px',
        textAlign: 'left',
    },
    resultHeader: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    error: {
        color: 'red',
    },
};
