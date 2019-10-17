const userModel = require('../models/user.model');

exports.GetAll = function(req, res){
    userModel.find().sort().then(eachOne=>{
        res.json(eachOne);
    })
}
// exports.user_test_d = function(req, res){
//     User.find({'password': {$eq: 'disabled'}}).sort().then(eachOne=>{
//         res.json(eachOne);
//     })
// }
exports.Add = function (req, res) {
    let user = new userModel(
        {
            username: req.body.username,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(user)
    })
};

// exports.product_create = function (req, res) {
//     let product = new Product(
//         {
//             name: req.body.name,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             taxRate: req.body.taxRate,
//             description: req.body.description,
//         }
//     );

//     product.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.send(product)
//     })
// };

// exports.product_details = function (req, res) {
//     Product.findOne({name: req.params.id}, function (err, product) {
//         if (err) return next(err);
//         res.send(product);
//     })
// };

// exports.product_update = function (req, res) {
//     Product.findOneAndUpdate({name: req.params.id}, {$set: req.body}, function (err, product) {
//         if (err) return next(err);
//         res.send('Product udpated.');
//     });
// };

// exports.product_delete = function (req, res) {
//     Product.findOneAndRemove({name: req.params.id}, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };
