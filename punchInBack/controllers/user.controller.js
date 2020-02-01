const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.GetAll = function (req, res) {
    userModel.find().sort().then(eachOne => {
        res.json(eachOne);
    })
}
exports.Get = function (req, res) {
    if(req.params !== null){
        userModel.find({ 'username': { $eq: req.params.username } }).sort().then(eachOne => {
            bcrypt.compare(req.params.password, eachOne[0].password, (err, result) => {
                if (result) {
                    res.json(eachOne);
                } else {
                    return res.status(400).send({
                        message: 'This is an error!'
                    });
                }
            })
        })
    }
}
exports.Add = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        console.log(hash)
        let user = new userModel(
            {
                username: req.body.username,
                password: hash,
                company: req.body.company,
                companyCode: req.body.companyCode
            })
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send(user)
        })
    });
};
