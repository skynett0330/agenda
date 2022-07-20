const express = require("express");
const router = express.Router();
const pool = require("../database/database");
const userController = require("../controllers/loginControlles")
//           users/register

// /

router.get('/add',userController.add)
router.post('/register', userController.register)
router.get('/logout', userController.logout)
router.get('/getAll',userController.getAll)
router.get('/delete/:id?',userController.delUser)



module.exports = router