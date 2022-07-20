const { Pool } = require("pg");
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

pool.connect(function (err) {
  if (err) {
    throw err
  } else {
    console.log('connect ao banco teste')
  }
})



module.exports = pool;
