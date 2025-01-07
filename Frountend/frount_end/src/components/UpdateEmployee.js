import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        full_name: '',
        age: '',
        NIC: '',
        address: '',
        phone_number: '',
        email: '',
        user_name: '',
        password: '',
        date_of_birth: '',
        job_title: '',
        basic_salary: '',
        date_of_hire: '',
    });

    
    const jobTitles = [
        { value: '', label: 'Select Job Title', disabled: true },
        { value: 'cso portal', label: 'CSO Portal' },
        { value: 'employee manager', label: 'Employee Manager' },
        { value: 'Mobile Technician', label: 'Mobile Technician' },
        { value: 'Customer Service Representative', label: 'Customer Service Representative' },
        { value: 'Inventory Manager', label: 'Inventory Manager' }
    ];

    const basicSalaries = [
        { value: '', label: 'Select Basic Salary', disabled: true },
        { value: '30000', label: 'Rs. 30000.00' },
        { value: '32000', label: 'Rs. 32000.00' },
        { value: '35000', label: 'Rs. 35000.00' },
        { value: '37000', label: 'Rs. 37000.00' },
        { value: '40000', label: 'Rs. 40000.00' }
    ];

    useEffect(() => {
        
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/employee/get/${id}`);
                setEmployee(response.data.employee);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!employee.date_of_birth || !employee.date_of_hire) {
            alert("Date of Birth and Date of Hire cannot be empty.");
            return;
        }

        try {
            await axios.put(`http://localhost:8070/employee/update/${id}`, employee);
            alert("Employee details updated successfully!");
            navigate('/employees'); 
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("An error occurred while updating the employee details.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Update Employee</h2><br></br><br></br>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name:  </label><br></br>
                    <input type="text" name="full_name" value={employee.full_name} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Age:    </label><br></br>
                    <input type="number" name="age" value={employee.age} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>NIC:    </label><br></br>
                    <input type="text" name="NIC" value={employee.NIC} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Address:    </label><br></br>
                    <input type="text" name="address" value={employee.address} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Phone Number:   </label><br></br>
                    <input type="text" name="phone_number" value={employee.phone_number} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Email:  </label><br></br>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>User Name:  </label><br></br>
                    <input type="text" name="user_name" value={employee.user_name} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Password:   </label><br></br>
                    <input type="password" name="password" value={employee.password} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Date of Birth:  </label><br></br>
                    <input type="date" name="date_of_birth" value={employee.date_of_birth} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Job Title:  </label><br></br>
                    <select name="job_title" value={employee.job_title} onChange={handleChange} required style={styles.input}>
                        {jobTitles.map((title, index) => (
                            <option key={index} value={title.value} disabled={title.disabled}>{title.label}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Basic Salary:   </label><br></br>
                    <select name="basic_salary" value={employee.basic_salary} onChange={handleChange} required style={styles.input}>
                        {basicSalaries.map((salary, index) => (
                            <option key={index} value={salary.value} disabled={salary.disabled}>{salary.label}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                <br></br><label style={styles.label}>Date of Hire:   </label><br></br><br></br>
                    <input type="date" name="date_of_hire" value={employee.date_of_hire} onChange={handleChange} required style={styles.input} />
                </div>
                <br></br><br></br><button type="submit" style={styles.button}>Update Employee</button>
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
        textAlign:"center",
    },
    formGroup: {
        marginBottom: '15px',
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
    },
    button: {
        padding: '10px',
        backgroundColor: '#00ACC1',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '20px',
    },
};

export default UpdateEmployee;
