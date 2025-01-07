import React from 'react';
import { Link } from 'react-router-dom';

export default function CSOPortal() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>CSO Portal</h1>
            <div style={styles.buttonContainer}>
                <Link to="/checkin" style={styles.link}>
                    <button style={styles.button}>Check In</button>
                </Link>
                <Link to="/checkout" style={styles.link}>
                    <button style={styles.button}>Check Out</button>
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
    buttonHover: {
        backgroundColor: '#007bff',
    }
};
