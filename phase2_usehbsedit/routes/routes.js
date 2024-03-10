/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);


const app = express();




module.exports = app;