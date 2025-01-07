import React from 'react';
import { Link } from 'react-router-dom';

const MainEmp = () => {
  return (
    <div style={styles.container}>
      <img src='abc.png'></img>
      <h1 style={styles.header}>Employee Management Dashboard</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>CSO Portal</button>
        </Link>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Employee Dashboard</button>
        </Link>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Employee Manager Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212',
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%', 
    maxWidth: '300px', 
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#00ACC1',
    color: 'white', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%', 
  },
  link: {
    textDecoration: 'none', 
  },

};

export default MainEmp;
