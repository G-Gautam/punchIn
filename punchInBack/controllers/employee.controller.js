const employeeModel = require('../models/employee.model');
const userModel = require('../models/user.model');

exports.GetAll = function (req, res) {
    console.log("Here")
    employeeModel.find().sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.Get = function (req, res) {
    employeeModel.find({ 'username': { $eq: req.params.username } }).sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.GetByCode = function (req, res) {
    console.log("Here")
    employeeModel.find({ 'company': { $eq: req.params.code } }).sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.Add = function (req, res) {
    let employee = new employeeModel(
        {
            name: req.body.name,
            salary: req.body.salary,
            company: req.body.company,
            startDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
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
        else {
            res.send("Company code not recognized");
        }
    })

};

exports.Delete = function (req, res) {
    employeeModel.deleteOne({ '_id': req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
}

exports.Update = function(req, res) {
    employeeModel.findByIdAndUpdate(req.params.id, { $set: { 'name': req.body.name, 'salary': req.body.salary}}, (err, result)=>{
        if (err) return next(err);
        res.send(result);    
    })
}