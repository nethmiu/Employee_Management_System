const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "<your@gmail.com>",
        pass: "###",
    },
});

// add  new leave request
router.route("/add1").post(async (req, res) => {
    const { employee_id, leave_type, start_date, end_date } = req.body;
    const leaveDays = (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24) + 1;

    
    if (!ObjectId.isValid(employee_id)) {
        return res.status(400).send({ status: "Invalid employee_id format. Please provide a valid ObjectId." });
    }

    try {
        
        const existingLeave = await Leave.findOne({ employee_id: employee_id, leave_status: "Pending" });

        if (existingLeave) {
            return res.status(400).send({ status: "You already have a pending leave request. You can't add another one until it is approved or rejected." });
        }

        
        if (leaveDays > 10) {
            return res.status(400).send({ status: "Leave duration cannot exceed 10 days." });
        }

        
        const employeeLeaveData = await Leave.findOne({ employee_id }).sort({ date: -1 });

        if (leave_type === "Annual Leave") {
            
            if (employeeLeaveData && employeeLeaveData.annual_leave_balance < leaveDays) {
                return res.status(400).send({ status: "Not enough annual leave balance. You can apply for No Pay Leave." });
            }
        }

        if (leave_type === "No Pay Leave") {
            
            if (!employeeLeaveData || employeeLeaveData.annual_leave_balance > 0) {
                return res.status(400).send({ status: "You can only apply for No Pay Leave if your annual leave balance is 0." });
            }
        }
        
        // check leve is in current yr
        const currentYear = new Date().getFullYear();
        const startYear = new Date(start_date).getFullYear();
        const endYear = new Date(end_date).getFullYear();
 
        if (startYear !== currentYear || endYear !== currentYear) {
            return res.status(400).send({ status: "Leave requests can only be made for the current year." });
        }

        const leave_status = "Pending";

        
        const currentDateTime = new Date().toLocaleString();

        
        const newLeave = new Leave({
            employee_id,
            leave_type,
            start_date,
            end_date,
            leave_status,
            date: currentDateTime, 
            annual_leave_balance: employeeLeaveData ? parseFloat(employeeLeaveData.annual_leave_balance).toFixed(1) : parseFloat(45).toFixed(1),  
            nopay_count: employeeLeaveData ? employeeLeaveData.nopay_count : 0 
        });

        await newLeave.save();
        res.status(200).send({ status: "Leave request added successfully." });

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with adding leave request", error: err.message });
    }
});

// read all in spec time
router.route("/read1").get(async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        const leaves = await Leave.find({
            start_date: { $gte: new Date(start_date) },
            end_date: { $lte: new Date(end_date) }
        });

        if (leaves.length === 0) {
            return res.status(404).send({ status: "No leave requests found within this time duration" });
        }

        res.status(200).send({ status: "Leave requests fetched", leaves });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching leave requests", error: err.message });
    }
});










// Route to update a leave request (Approve/Reject)
router.route("/update1/:leave_id").put(async (req, res) => {
    const leaveId = req.params.leave_id;
    const { leave_status } = req.body;

    try {
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).send({ status: "No leave request found with this ID." });
        }

        if (leave.leave_status === "Approve") {
            return res.status(400).send({ status: "This leave request is already approved; you can't update it." });
        } else if (leave.leave_status === "Reject") {
            return res.status(400).send({ status: "This leave request is already rejected; you can't update it." });
        }

        const leaveDays = (new Date(leave.end_date) - new Date(leave.start_date)) / (1000 * 60 * 60 * 24) + 1;

        if (leave_status === "Approve" && leave.leave_type === "Annual Leave") {
            const employeeLeaveData = await Leave.findOne({ employee_id: leave.employee_id }).sort({ date: -1 });
            if (employeeLeaveData) {
                employeeLeaveData.annual_leave_balance -= leaveDays;
                if (employeeLeaveData.annual_leave_balance < 0) {
                    employeeLeaveData.annual_leave_balance = 0;
                }
                employeeLeaveData.annual_leave_balance = parseFloat(employeeLeaveData.annual_leave_balance).toFixed(1);
                await employeeLeaveData.save();
            }
        }

        if (leave.leave_type === "No Pay Leave" && leave_status === "Approve") {
            leave.nopay_count += leaveDays;
        }

        leave.leave_status = leave_status;
        leave.email_sent = true;

        await leave.save();

        
        const employee = await Employee.findById(leave.employee_id);
        if (!employee) {
            return res.status(404).send({ status: "Employee not found." });
        }

        
        await transporter.sendMail({
            from: '"Leave Management System" <yourgmail@gmail.com>',
            to: employee.email, 
            subject: `Your leave request has been ${leave_status}`,
            html: `<p>Your leave request for ${leave.leave_type} from ${leave.start_date} to ${leave.end_date} has been <b>${leave_status.toLowerCase()}</b>.</p>`
        });

        res.status(200).send({ status: "Leave request updated successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating leave request", error: err.message });
    }
});








// delete pendin req only
router.route("/delete1/:leave_id").delete(async (req, res) => {
    const leaveId = req.params.leave_id;

    try {
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).send({ status: "No leave request found with this ID." });
        }

        if (leave.leave_status === "Approve") {
            return res.status(400).send({ status: "This leave request is already approved; you can't delete it." });
        } else if (leave.leave_status === "Reject") {
            return res.status(400).send({ status: "This leave request is already rejected; you can't delete it." });
        }

        await Leave.findByIdAndDelete(leaveId);
        res.status(200).send({ status: "Pending leave request deleted successfully." });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting leave request", error: err.message });
    }
});

//get by emp id spec time
router.route("/get1/:employee_id").get(async (req, res) => {
    const { employee_id } = req.params;
    const { start_date, end_date } = req.query;

    try {
        
        if (!start_date || !end_date) {
            return res.status(400).send({ status: "Please provide both start_date and end_date." });
        }

        
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        
        const query = {
            employee_id,
            start_date: { $gte: startDate },
            end_date: { $lte: endDate }
        };

        
        const leaveRequests = await Leave.find(query, {
            employee_id: 1,  
            leave_type: 1,
            start_date: 1,
            end_date: 1,
            leave_status: 1,
            date: 1,
            annual_leave_balance: 1,
            nopay_count: 1
        });

        if (leaveRequests.length === 0) {
            return res.status(404).send({ status: "No leave requests found for this employee within this time duration." });
        }

        res.status(200).send({ status: "Leave requests fetched successfully.", leaveRequests });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching leave requests", error: err.message });
    }
});


// pen levs diplay
router.route("/pen").get(async (req, res) => {
    try {
        const pendingLeaves = await Leave.find({ leave_status: "Pending" });

        if (pendingLeaves.length === 0) {
            return res.status(404).send({ status: "No pending leave requests found." });
        }

        res.status(200).send({ status: "Pending leave requests fetched successfully", pendingLeaves });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error fetching pending leave requests", error: err.message });
    }
});


//app levs diplay
router.route("/app").get(async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        const approvedLeaves = await Leave.find({
            leave_status: "Approve",
            start_date: { $gte: new Date(start_date) },
            end_date: { $lte: new Date(end_date) }
        });

        if (approvedLeaves.length === 0) {
            return res.status(404).send({ status: "No approved leave requests found within this time duration." });
        }

        res.status(200).send({ status: "Approved leave requests fetched successfully", approvedLeaves });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching approved leave requests", error: err.message });
    }
});

// rej display
router.route("/rej").get(async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        const rejectedLeaves = await Leave.find({
            leave_status: "Reject",
            start_date: { $gte: new Date(start_date) },
            end_date: { $lte: new Date(end_date) }
        });

        if (rejectedLeaves.length === 0) {
            return res.status(404).send({ status: "No rejected leave requests found within this time duration." });
        }

        res.status(200).send({ status: "Rejected leave requests fetched successfully", rejectedLeaves });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching rejected leave requests", error: err.message });
    }
});
//read all 
router.route("/readall").get((req, res) => {
    Leave.find()
        .then((leaves) => {
            res.json(leaves); 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching Leave requests' });
        });
});




// calculate monthly leave accrual in days
const calculateMonthlyAccrual = (annual_leave_count, annual_leave_balance, nopay_count) => {
    let accrualRateDaysPerMonth;
    if (nopay_count > 0) {
        accrualRateDaysPerMonth = (annual_leave_count + nopay_count) / 12;
    } else {
        accrualRateDaysPerMonth = (annual_leave_count - annual_leave_balance) / 12;
    }
    return accrualRateDaysPerMonth.toFixed(2); 
};

//  get the leave accrual rate bu epmid
router.route("/acc/:employee_id").get(async (req, res) => {
    const { employee_id } = req.params;

    try {
        
        if (!ObjectId.isValid(employee_id)) {
            return res.status(400).send({ status: "Invalid employee_id format. Please provide a valid ObjectId." });
        }

        const leaveData = await Leave.findOne({ employee_id }).sort({ date: -1 });

        if (!leaveData) {
            return res.status(404).send({ status: "No leave data found for this employee." });
        }

        const { annual_leave_count, annual_leave_balance, nopay_count } = leaveData;
        const accrualRateDaysPerMonth = calculateMonthlyAccrual(annual_leave_count, annual_leave_balance, nopay_count);

        res.status(200).send({ status: "Accrual rate calculated successfully.", accrualRateDaysPerMonth: `${accrualRateDaysPerMonth} Days Per Month` });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with calculating accrual rate", error: err.message });
    }
});

router.post("/yend", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        
        const leaveRecords = await Leave.find().lean();

        if (leaveRecords.length > 0) {
            await PastLeave.insertMany(leaveRecords);
        }

        
        await Employee.updateMany(
            {},
            {
                $set: {
                    annual_leave_balance: 45,
                    annual_leave_count: 45,
                    nopay_count: 0
                }
            },
            { session }
        );

        
        await Leave.deleteMany({}, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).send({ status: "Year-end reset successful, leave records moved and deleted." });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error during year-end reset:", err); 
        res.status(500).send({ error: err.message || "An unexpected error occurred." });
    }
});









async function getAllPastLeaveRecords() {
    try {
    
        const pastLeaves = await PastLeave.find({});
        
        if (pastLeaves.length === 0) {
            return { status: 'No past leave records found.' };
        }

        return { status: 'Success', data: pastLeaves };
    } catch (err) {
        console.error('Error retrieving all past leave records:', err);
        return { status: 'Error', error: err.message };
    }
}

// get all past leave records
router.get("/pastall", async (req, res) => {
    try {
        const result = await getAllPastLeaveRecords();
        
        if (result.status === 'Success') {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (err) {
        res.status(500).json({ status: "Error", error: err.message });
    }
});


//  get past leave records by empid
router.route("/past/:employee_id").get(async (req, res) => {
    const { employee_id } = req.params;

    
    if (!ObjectId.isValid(employee_id)) {
        return res.status(400).send({ status: "Invalid employee_id format. Please provide a valid ObjectId." });
    }

    try {
        
        const pastLeaveRecords = await PastLeave.find({ employee_id });

        if (pastLeaveRecords.length === 0) {
            return res.status(404).send({ status: "No past leave records found for this employee." });
        }

        res.status(200).send({ status: "Past leave records fetched successfully.", pastLeaveRecords });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching past leave records", error: err.message });
    }
});


//get annual_leave_balance and nopay_count 
router.get('/balance/:employee_id', async (req, res) => {
    const { employee_id } = req.params;

    try {
        // Validate employee_id
        if (!mongoose.Types.ObjectId.isValid(employee_id)) {
            return res.status(400).send({ status: "Invalid employee_id format. Please provide a valid ObjectId." });
        }

        const leaveData = await Leave.findOne({ employee_id });

        if (!leaveData) {
            return res.status(404).send({ status: "No leave data found for this employee." });
        }

        const { annual_leave_balance, nopay_count } = leaveData;
        res.status(200).send({ status: "Leave data retrieved successfully.", annual_leave_balance, nopay_count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error retrieving leave data", error: err.message });
    }
});

module.exports = router;








module.exports = router;
