const router = require("express").Router();
let Employee = require("../models/Employee");







const PDFDocument = require('pdfkit');

// pdf
router.get('/report/pdf/:employee_id', async (req, res) => {
    const { employee_id } = req.params;

    try {
        const employee = await Employee.findById(employee_id);

        if (!employee) {
            return res.status(404).send({ status: "No employee found with the given ID." });
        }

        
        const doc = new PDFDocument();

        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-disposition', `attachment; filename=employee_${employee_id}.pdf`);

        
        doc.pipe(res);

        
        doc.fontSize(26).font('Helvetica-Bold').text('Cellular World Pvt. Ltd', { align: 'center' });

        
        doc.moveDown();
        doc.fontSize(20).font('Helvetica-Bold').text('Employee Information Report', { align: 'center' });
        doc.moveDown(2);

        
        doc.fontSize(14).font('Helvetica-Bold').text('Employee Details:', { underline: true });
        doc.moveDown(1);

        
        doc.font('Helvetica-Bold').text('Full Name:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.full_name}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Age:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.age}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('NIC:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.NIC}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Address:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.address}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Phone Number:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.phone_number}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Email:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.email}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Job Title:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.job_title}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Basic Salary:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.basic_salary}`);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Date of Hire:  ', { continued: true });
        doc.font('Helvetica').text(`${employee.date_of_hire.toDateString()}`);
        doc.moveDown(3);

        
        doc.text('Signature: ....................', { align: 'left' });

        
        doc.end();

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error generating employee PDF", error: err.message });
    }
});




// add new employee
router.route("/add").post((req, res) => {
    const { full_name, age, NIC, address, phone_number, email, user_name, password, date_of_birth, job_title, basic_salary, date_of_hire } = req.body;

    const newEmployee = new Employee({
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
        date_of_hire
    });

    newEmployee.save()
        .then(() => res.json("Employee Added"))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while adding the employee.' });
        });
});

// get all employees
router.route("/").get((req, res) => {
    Employee.find()
        .then((employees) => res.json(employees))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching employees.' });
        });
});

// update employee by empid
router.route("/update/:id").put(async (req, res) => {
    let empId = req.params.id;
    const { full_name, age, NIC, address, phone_number, email, user_name, password, date_of_birth, job_title, basic_salary, date_of_hire } = req.body;

    const updateEmployee = {
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
        date_of_hire
    };

    await Employee.findByIdAndUpdate(empId, updateEmployee)
        .then(() => res.status(200).send({ status: "Employee updated" }))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

// delete an employee by empid
router.route("/delete/:id").delete(async (req, res) => {
    let empId = req.params.id;

    await Employee.findByIdAndDelete(empId)
        .then(() => res.status(200).send({ status: "Employee deleted" }))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting employee", error: err.message });
        });
});

// get a employee by empid
router.route("/get/:id").get(async (req, res) => {
    let empId = req.params.id;

    await Employee.findById(empId)
        .then((employee) => res.status(200).send({ status: "Employee Fetched", employee }))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with getting employee", error: err.message });
        });
});


// search employee using nic
router.route("/nic").get(async (req, res) => {
    const { NIC } = req.query;

    if (!NIC) {
        return res.status(400).send({ status: "NIC query parameter is required." });
    }

    try {
        const employee = await Employee.findOne({ NIC });

        if (!employee) {
            return res.status(404).send({ status: "No employee found with the given NIC." });
        }

        res.status(200).send({ status: "Employee found", employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching employee by NIC", error: err.message });
    }
});


// search employee using empid
router.route("/eid").get(async (req, res) => {
    const { employee_id } = req.query;

    if (!employee_id) {
        return res.status(400).send({ status: "employee_id query parameter is required." });
    }

    try {
        const employee = await Employee.findOne({ _id: employee_id });

        if (!employee) {
            return res.status(404).send({ status: "No employee found with the given employee_id." });
        }

        res.status(200).send({ status: "Employee found", employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching employee by employee_id", error: err.message });
    }
});


// delete a employee by empid and store removal reason
router.route("/deleter/:id").delete(async (req, res) => {
    const empId = req.params.id;
    const { removal_reason } = req.body; 

    if (!removal_reason) {
        return res.status(400).send({ status: "Removal reason is required." });
    }

    try {
        // stor removel reasion
        const employee = await Employee.findById(empId);
        if (!employee) {
            return res.status(404).send({ status: "Employee not found." });
        }

        const newEmployeeRemoval = new EmployeeRemoval({
            employee_id: empId,
            removal_reason
        });

        await newEmployeeRemoval.save();

        // delete  employee record
        await Employee.findByIdAndDelete(empId);

        res.status(200).send({ status: "Employee deleted and removal reason recorded." });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting employee", error: err.message });
    }
});

// Login 
router.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).send({ status: "Username and password are required." });
    }

    try {
        const employee = await Employee.findOne({ user_name });

        if (!employee) {
            return res.status(404).send({ status: "User not found." });
        }

        const isMatch = await employee.comparePassword(password);

        if (isMatch) {
            
            switch (employee.job_title) {
                case 'cso portal':
                    return res.status(200).send({ status: "Login successful", redirect: "/cso"});
                case 'employee manager':
                    return res.status(200).send({ status: "Login successful", redirect: "/man"});
                default:
                    return res.status(200).send({ status: "Login successful", redirect: "/emp"});
            }
        } else {
            return res.status(400).send({ status: "Invalid credentials." });
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: "Error with login", error: err.message });
    }
});


// npmal report
router.route("/report/:employee_id").get(async (req, res) => {
    const { employee_id } = req.params;

    try {
        const employee = await Employee.findById(employee_id);

        if (!employee) {
            return res.status(404).send({ status: "No employee found with the given ID." });
        }

        
        res.status(200).send({ status: "Employee details fetched successfully", employee });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching employee details", error: err.message });
    }
});






module.exports = router;
