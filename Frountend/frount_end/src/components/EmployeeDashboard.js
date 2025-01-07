import React from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Employee Dashboard</h1>
            <div style={styles.buttonContainer}>
                <Link to="/leaves/add" style={styles.link}>
                    <button style={styles.button}>Apply For Leaves</button>
                </Link>
                <Link to="/le" style={styles.link}>
                    <button style={styles.button}>View Leaves</button>
                </Link>
                <Link to="/acc" style={styles.link}>
                    <button style={styles.button}>Calculate Leave Accrual</button>
                </Link>
            </div>
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
        marginBottom: '40px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#00ACC1',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    link: {
        textDecoration: 'none', 
    },
};
