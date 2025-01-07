const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const { now } = require('mongoose');



// checkout
router.post('/checkout', async (req, res) => {
    const { employee_id } = req.body;

    try {
        // check that emlpy register or not
        const employee = await Employee.findOne({ _id: employee_id });
        if (!employee) {
            return res.status(404).send({ status: "Employee not found. Only registered employees can check out." });
        }

        let attendance = await Attendance.findOne({ employee_id, check_out_time: null });

        if (!attendance || !attendance.check_in_time) {
            return res.status(400).send({ status: "No check-in record found. Please check in first." });
        }

        attendance.check_out_time = new Date().toLocaleString();

        const checkInTime = new Date(attendance.check_in_time);
        const checkOutTime = new Date(attendance.check_out_time);
        const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        attendance.work_duration_hours = parseFloat(duration.toFixed(2));

        await attendance.save();
        res.status(200).send({ status: "Checked out successfully"});

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with check-out", error: err.message });
    }
});










// get all emp attwndce recods
router.get('/read-all', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({}, {
            employee_id: 1,
            check_in_time: 1,
            check_out_time: 1,
            work_duration_hours: 1
        });

        if (!attendanceRecords.length) {
            return res.status(404).send({ status: "No attendance records found." });
        }

        res.status(200).send({ status: "Attendance records fetched successfully", attendanceRecords });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with fetching attendance records", error: err.message });
    }
});





// get attendes rec using emp id
router.get('/read2/:employee_id', async (req, res) => {
    const { employee_id } = req.params;

    try {
        // find attendance records by emp id
        const query = { employee_id };

        const attendanceRecords = await Attendance.find(query, {
            employee_id: 1,
            check_in_time: 1,
            check_out_time: 1,
            work_duration_hours: 1
        });

        // check if records or not befor
        if (!attendanceRecords.length) {
            return res.status(404).send({ status: "No attendance records found for the specified employee." });
        }

        res.status(200).send({ status: "Attendance records fetched successfully", attendanceRecords });

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with fetching attendance records", error: err.message });
    }
});








//delete attenc rec by empid
router.delete('/delete/:id', async (req, res) => {
    const recordId = req.params.id;

    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(recordId);

        if (!deletedAttendance) {
            return res.status(404).send({ status: "Attendance record not found" });
        }

        res.status(200).send({ status: "Attendance record deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting attendance record", error: err.message });
    }
});


// chekin part
router.post('/checkin', async (req, res) => {
    const { employee_id } = req.body;

    try {
        // check empid in the emp tabele
        const employee = await Employee.findOne({ _id: employee_id });
        if (!employee) {
            return res.status(404).send({ status: "Employee not found. Only registered employees can check in." });
        }

        let attendance = await Attendance.findOne({ employee_id, check_out_time: null });

        if (attendance && attendance.check_in_time) {
            return res.status(400).send({ status: "You have already checked in." });
        }

        if (attendance) {
            attendance.check_in_time = new Date();
        } else {
            attendance = new Attendance({
                employee_id,
                check_in_time:new Date().toLocaleString()

            });
        }

        await attendance.save();

        // respond with  personalized check-in msg
        res.status(200).send({ 
            status: "Checked in successfully.",
            message: `Welcome ${employee.full_name}` 
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with check-in", error: err.message });
    } 
});


module.exports = router;
