const mysql2 = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();


const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error){
        console.log(error);
        throw error;
     }
     console.log("Welcome to Employee Information!");
});