import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`http://localhost:8070/employee/delete/${id}`);
                alert("Employee deleted successfully!");
                navigate('/employee'); 
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("An error occurred while deleting the employee.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Delete Employee</h2>
            <p>Are you sure you want to delete this employee?</p>
            <button onClick={handleDelete} style={styles.button}>Delete</button>
            <button onClick={() => navigate('/employee')} style={styles.cancelButton}>Cancel</button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#121212',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '20px auto',
        textAlign: 'center',
    },
    header: {
        marginBottom: '20px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#FF5252',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#00ACC1',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default DeleteEmployee;
