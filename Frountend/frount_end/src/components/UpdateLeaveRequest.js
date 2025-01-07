import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateLeaveStatus = () => {
    const { leave_id } = useParams(); 
    const navigate = useNavigate();
    
    const [leaveStatus, setLeaveStatus] = useState('');

    useEffect(() => {
        
    }, [leave_id]);

    const handleChange = (e) => {
        setLeaveStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!leaveStatus) {
            alert("Leave status cannot be empty.");
            return;
        }

        console.log("Submitting leave status:", leaveStatus); 

        try {
            const response = await axios.put(`http://localhost:8070/leave/update1/${leave_id}`, { leave_status: leaveStatus });
            console.log("Update response:", response); 
            alert("Leave status updated successfully!");
            navigate('/leave/readall'); 
        } catch (error) {
            console.error("Error updating leave status:", error.response ? error.response.data : error.message);
            alert("An error occurred while updating the leave status. Please check the console for more details.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Update Leave Status</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Leave Status:</label>
                    <select value={leaveStatus} onChange={handleChange} required style={styles.select}>
                        <option value="" disabled>Select leave status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                    </select>
                </div>
                <button type="submit" style={styles.button}>Update Leave Status</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#121212',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '20px auto',
    },
    header: {
        textAlign: 'center',
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
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#1e1e1e',
        color: 'white',
    },
    button: {
        padding: '10px',
        backgroundColor: '#00ACC1',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default UpdateLeaveStatus;
