const employeeModel = require('../models/employee.model');
const userModel = require('../models/user.model');

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
    userModel.find({ 'companyCode': { $eq: employee.company } }).sort().then(eachOne => {
        if (eachOne.length !== 0) {
            employee.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send(employee)
            });
        }
        else{
            res.send("Company code not recognized");
        }
    })

};