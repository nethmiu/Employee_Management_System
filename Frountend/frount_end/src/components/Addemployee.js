import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
  const [full_name, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [basic_salary, setBasicSalary] = useState("");
  const [date_of_hire, setDateOfHire] = useState("");

  const validateInputs = () => {
    // Full Name: Only alphabets
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(full_name)) {
      alert("Full Name must contain only alphabets.");
      return false;
    }

    // Age: Must be between 18 and 60
    const ageNum = parseInt(age, 10);
    if (ageNum < 18 || ageNum > 60) {
      alert("Age must be between 18 and 60.");
      return false;
    }

    // NIC: Max length of 12 characters
    if (NIC.length > 12) {
      alert("NIC must be 12 characters or less.");
      return false;
    }

    // Phone Number: Must be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone_number)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }

    // Password: 2-12 characters
    if (password.length < 2 || password.length > 12) {
      alert("Password must be between 2 and 12 characters.");
      return false;
    }

    // Username: 2-12 characters
    if (user_name.length < 2 || user_name.length > 12) {
      alert("Username must be between 2 and 12 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!validateInputs()) {
      return;
    }

    const employee = {
      full_name,
      age,
      NIC,
      address,
      phone_number,
      email,
      user_name,
      password,
      date_of_birth,
      job_title,
      basic_salary,
      date_of_hire,
    };
    
    axios.post("http://localhost:8070/employee/add", employee)
      .then(() => {
        alert("Employee Added");
        setFullName("");
        setAge("");
        setNIC("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");
        setUserName("");
        setPassword("");
        setDateOfBirth("");
        setJobTitle("");
        setBasicSalary("");
        setDateOfHire("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div className="container" style={{ width: "50%" }}>
        <h2 className="text-center my-4">Register Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">NIC:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter NIC"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              value={date_of_birth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Title:</label>
            <select
              className="form-control"
              value={job_title}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            >
              <option value="" disabled>Select Job Title</option>
              <option value="cso portal">CSO portal</option>
              <option value="employee manager">Employee Manager</option>
              <option value="Mobile Technician">Mobile Technician</option>
              <option value="Customer Service Representative">Customer Service Representative</option>
              <option value="Inventory Manager">Inventory Manager</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Basic Salary:</label>
            <select
              className="form-control"
              value={basic_salary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            >
              <option value="" disabled>Select Basic Salary</option>
              <option value="30000">Rs.30000.00</option>
              <option value="32000">Rs.32000.00</option>
              <option value="35000">Rs.35000.00</option>
              <option value="40000">Rs.40000.00</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Hire:</label>
            <input
              type="date"
              className="form-control"
              value={date_of_hire}
              onChange={(e) => setDateOfHire(e.target.value)}
              required
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid white",
              }}
            />
          </div>

         <center> <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#00ACC1",
                color: "white",
                width: "20%",
                padding: "10px",
                textAlign: "center",
                margin: "60px",
              }}
            >


            Add Employee
          </button></center>
        </form>
      </div>
    </div>
  );
}
