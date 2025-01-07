const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leave_type: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    date: { type: String },
    leave_status: {
        type: String,
        enum: ['Pending', 'Approve', 'Reject'],
        default: 'Pending'
    },
    annual_leave_count: {
        type: Number,
        default: 45
    },
    annual_leave_balance: {
        type: Number,
        default: 45
    },
    nopay_count: {
        type: Number,
        default: 0
    }

    
    

});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;
