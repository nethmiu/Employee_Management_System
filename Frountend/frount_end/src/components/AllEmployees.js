
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  // get all emplys
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8070/employee/');
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>All Employees</h2>
      <table className="table" style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>ID</th>
            <th style={styles.headerCell}>Full Name</th>
            <th style={styles.headerCell}>Age</th>
            <th style={styles.headerCell}>NIC</th>
            <th style={styles.headerCell}>Address</th>
            <th style={styles.headerCell}>Phone Number</th>
            <th style={styles.headerCell}>Email</th>
            <th style={styles.headerCell}>Job Title</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.age}</td>
              <td>{employee.NIC}</td>
              <td>{employee.address}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.email}</td>
              <td>{employee.job_title}</td>
              <td>
  <Link to={`/update/${employee._id}`}>
    <button className="btn btn-warning" style={styles.button}>Update</button>
  </Link>
  <Link to={`/delete/${employee._id}`}>
    <button className="btn btn-danger" style={styles.deleteButton}>Delete</button>
  </Link>
</td>

            </tr>
          ))}
        </tbody>
      </table>
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
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    backgroundColor: '#00ACC1',
    color: 'white',
    padding: '10px',
  },
  button: {
    backgroundColor: '#00ACC1',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
    margin: '0 5px',
  },

  
    deleteButton: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 12px',
      cursor: 'pointer',
      margin: '0 5px',
    },
  
  
};
