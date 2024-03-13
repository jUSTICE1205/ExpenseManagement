const express = require('express');
const {loginController, registerController} = require('../controllers/userController');

// Router Object
const router = express.Router();

//Routes

// LOGIN
router.post('/login', loginController)

//Register
router.post('/register', registerController, () => {
    console.log("inside")
})


module.exports = router;