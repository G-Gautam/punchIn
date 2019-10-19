const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const employee_controller = require('../controllers/employee.controller');
// a simple test url to check that all of our files are communicating correctly.
module.exports = router;

router.get('/allemployees', employee_controller.GetAll);
router.get('/employee/:username', employee_controller.Get);
// router.get('/user/test/disabled', product_controller.user_test_d);
router.post('/employee', employee_controller.Add);
// router.post('/create', product_controller.product_create);
// router.get('/:id', product_controller.product_details);
// router.put('/:id', product_controller.product_update);
// router.delete('/:id', product_controller.product_delete);