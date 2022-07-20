const express = require("express");
const router = express.Router();
const pool = require("../database/database");




router.get("/", function(req, res) {
    res.render("login/login")
})



module.exports = router;