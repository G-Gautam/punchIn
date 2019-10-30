const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
    name: {type: String, required: true},
    salary: {type: Number, required: true},
    company: {type: String, required: true},
    startDate: {type: Date, required: true}

});


// Export the model
module.exports = mongoose.model('employee', employeeSchema);