const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    check_in_time: { type: String },
    check_out_time: { type: String },
    work_duration_hours: { type: Number }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
