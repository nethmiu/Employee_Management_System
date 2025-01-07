import React, { useState } from 'react';
import axios from 'axios';

export default function SearchEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [nic, setNic] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const handleSearchById = async () => {
    setError(''); 
    try {
      const response = await axios.get(`http://localhost:8070/employee/eid`, {
        params: { employee_id: employeeId },
      });
      setEmployee(response.data.employee); 
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.status || 'Error fetching employee');
      } else {
        setError('Error fetching employee');
      }
      setEmployee(null); 
    }
  };

  const handleSearchByNIC = async () => {
    setError(''); 
    try {
      const response = await axios.get(`http://localhost:8070/employee/nic`, {
        params: { NIC: nic },
      });
      setEmployee(response.data.employee); 
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.status || 'Error fetching employee');
      } else {
        setError('Error fetching employee');
      }
      setEmployee(null); 
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Search Employee</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          style={styles.input}
        />
        <button onClick={handleSearchById} style={styles.button}>Search by ID</button><br></br><br></br>
      </div>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          placeholder="Enter NIC"
          style={styles.input}
        />
        <button onClick={handleSearchByNIC} style={styles.button}>Search by NIC</button>
      </div>
      
      {error && <p style={styles.error}>{error}</p>}
      
      {employee && (
        <div style={styles.result}>
          <h3>Employee Details:</h3>
          <p><strong>ID:</strong> {employee._id}</p>
          <p><strong>Full Name:</strong> {employee.full_name}</p>
          <p><strong>Age:</strong> {employee.age}</p>
          <p><strong>NIC:</strong> {employee.NIC}</p>
          <p><strong>Address:</strong> {employee.address}</p>
          <p><strong>Phone Number:</strong> {employee.phone_number}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Job Title:</strong> {employee.job_title}</p>
        </div>
      )}
    </div>
  );
}


const styles = {
  container: {
    backgroundColor: '#121212',
    color: 'white',
    fontFamily: 'Montserrat, sans-serif',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #00ACC1',
    marginRight: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#00ACC1',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  result: {
    marginTop: '20px',
    backgroundColor: '#1e1e1e',
    padding: '10px',
    borderRadius: '4px',
  },
};
