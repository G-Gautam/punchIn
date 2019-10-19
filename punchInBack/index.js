// server.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const user = require('./routes/user.route'); // Imports routes for the products
const employee = require('./routes/employee.route');
const server = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:password1@ds335648.mlab.com:35648/punchin';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/', user);
server.use('/employee', employee);

let port = 8081;

server.listen(port, process.env.IP,() => {
    console.log('Server is up and running on port number ' + port);
});

