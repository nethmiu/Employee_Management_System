const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const employeeSchema = new Schema({
    full_name: { type: String, required: true },
    age: { type: Number, required: true },
    NIC: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true,unique: true },
    date_of_birth: { type: Date, required: true },
    job_title: { type: String, required: true },
    basic_salary: { type: Number, required: true },
    date_of_hire: { type: Date, required: true }
});



// pwd hashing
employeeSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

// Compare pwd
employeeSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error('Error comparing passwords');
    }
};


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
