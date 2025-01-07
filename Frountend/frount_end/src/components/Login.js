import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ user_name: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const response = await axios.post('http://localhost:8070/employee/login', credentials);
            const { redirect } = response.data;

            
            navigate(redirect);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.status || 'An error occurred during login.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username : </label>
                    <input 
                        type="text" 
                        name="user_name" 
                        value={credentials.user_name} 
                        onChange={handleChange} 
                        required 
                        style={styles.input} 
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password : </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required 
                        style={styles.input} 
                    />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Login</button>
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
        maxWidth: '400px',
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
        marginRight: '25px',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#1e1e1e',
        color: 'white',
        float: 'right',
        
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
    error: {
        color: 'red',
        textAlign: 'center',
    },
};

export default Login;