import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const AddLeave = () => {
    const [formData, setFormData] = useState({
        employee_id: '',
        leave_type: 'Annual Leave', 
        start_date: '',
        end_date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8070/leave/add1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // successful msg
                alert('Leave request added successfully!');
                setFormData({
                    employee_id: '',
                    leave_type: 'Annual Leave',
                    start_date: '',
                    end_date: '',
                });
            } else {
                
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to add leave request.'}`);
            }
        } catch (error) {
            alert('An error occurred while adding the leave request. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#121212',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontFamily: 'Montserrat',
            }}
        >
            <div className="container" style={{ width: '50%' }}>
                <h2 className="text-center my-4">Add Leave</h2>

                
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Link to="/b" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                backgroundColor: '#00ACC1',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                fontFamily: 'Montserrat',
                                cursor: 'pointer',
                            }}
                        >
                            View Leave Balance
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} style={{ fontFamily: 'Montserrat' }}>
                    <div className="mb-3">
                        <label className="form-label">Employee ID:</label>
                        <input
                            type="text"
                            name="employee_id"
                            placeholder="Enter Employee ID"
                            value={formData.employee_id}
                            onChange={handleChange}
                            required
                            className="form-control"
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                border: '1px solid white',
                                fontFamily: 'Montserrat',
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Leave Type:</label>
                        <select
                            name="leave_type"
                            value={formData.leave_type}
                            onChange={handleChange}
                            required
                            className="form-control"
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                border: '1px solid white',
                                fontFamily: 'Montserrat',
                            }}
                        >
                            <option value="" disabled>Select Leave Type</option>
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="No Pay Leave">No Pay Leave</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Start Date:</label>
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                            className="form-control"
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                border: '1px solid white',
                                fontFamily: 'Montserrat',
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">End Date:</label>
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                            className="form-control"
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                border: '1px solid white',
                                fontFamily: 'Montserrat',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: '#00ACC1',
                                color: 'white',
                                width: '20%',
                                padding: '10px',
                                textAlign: 'center',
                                fontFamily: 'Montserrat',
                            }}
                        >
                            Add Leave
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;
