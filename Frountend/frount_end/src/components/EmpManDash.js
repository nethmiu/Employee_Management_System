import React from 'react';
import { Link } from 'react-router-dom';

function EmpManDash() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Manager Dashboard</h1>
      <div style={styles.buttonContainer}>
        <Link to="/add" style={styles.link}>
          <button style={styles.button}>Register Employee</button>
        </Link>
        <Link to="/all" style={styles.link}>
          <button style={styles.button}>Manage Employee</button>
        </Link>
        <Link to="/leave/readall" style={styles.link}>
          <button style={styles.button}>Manage My Leaves</button>
        </Link>
        <Link to="/attendance" style={styles.link}>
          <button style={styles.button}>Manage Attendance</button>
        </Link>
        <Link to="/eid" style={styles.link}>
          <button style={styles.button}>Search Employee Details</button>
        </Link>
        <Link to="/pdf" style={styles.link}> 
          <button style={styles.button}>Generate Employee Details Report</button>
        </Link>


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
    flexDirection: 'column',
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
    width: '250px', 
  },
  link: {
    textDecoration: 'none', 
  },
};

export default EmpManDash;
