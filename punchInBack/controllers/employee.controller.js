const employeeModel = require('../models/employee.model');

exports.GetAll = function (req, res) {
    employeeModel.find().sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.Get = function (req, res) {
    employeeModel.find({ 'username': { $eq: req.params.username } }).sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.Add = function (req, res) {
    let employee = new employeeModel(
        {
            name: req.body.name,
            salary: req.body.salary,
            company: req.body.company
        })
    console.log(employee);
    employee.save(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.send(employee)
    });
};