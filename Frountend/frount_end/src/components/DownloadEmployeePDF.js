import React, { useState } from 'react';

const DownloadEmployeePDF = () => {
    const [employeeId, setEmployeeId] = useState('');

    const handleDownload = () => {
        if (employeeId) {
            
            window.open(`http://localhost:8070/employee/report/pdf/${employeeId}`, '_blank');
        } else {
            alert("Please enter a valid Employee ID");
        }
    };

    return (
        <div style={{ fontFamily: 'Montserrat', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h2 style={{ color: '#121212' }}>Download Employee Report</h2>
            
            <label htmlFor="employeeId" style={{ marginRight: '10px', color: '#121212' }}>Enter Employee ID:</label>
            <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee ID"
                style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '10px'
                }}
            />
            
            <button
                onClick={handleDownload}
                style={{
                    backgroundColor: '#00ACC1',
                    color: '#121212',
                    fontFamily: 'Montserrat',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Download PDF
            </button>
        </div>
    );
};

export default DownloadEmployeePDF;
