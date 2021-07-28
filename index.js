const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
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
     openningQuestion();
});

// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles

function openningQuestion() {
    inquirer.prompt([
        {
        type: "list",
        name: "prompt",
        message: "What would you like to do today?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "Delete an employee", "close application"]
        },

    ]).then((response) => {
        if (response.prompt === "View all departments") {
           viewDepartments();
        };
        if (response.prompt === "View all roles") {
            viewRoles();
        };
        if (response.prompt === "View all employee") {
            viewEmployees();
        };

        if (response.prompt === "Add a departments") {
            addDepartment();
         };
         if (response.prompt === "Add a roles") {
             addRole();
         };
         if (response.prompt === "Add an employee") {
             addEmployee();
         };
    })
};

function viewRoles(){
    let mySQL =  
    `SELECT title 'Job titles'
     FROM role;`
     connection.query(mySQL, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('  ', res);
        openningQuestion();
    })

};

function viewDepartments(){
    let mySQL =  
    `SELECT department_name 'department'
     FROM department;`
     connection.query(mySQL, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('  ', res);
        openningQuestion();
    })

};
function viewEmployees(){
    let mySQL =  
     "SELECT employee.id, employee.first_name, employee.last_name, role.title," +
     "role.salary, department.department FROM employee " +
     "LEFT JOIN role ON role.id = employee.id JOIN department ON role.id = department.id";
     connection.query(mySQL, function (err, res){
        if (err) throw err;
        // console.log(res);
        console.table('All Employees', res);
        startInquirer();
    })

};
function addRole(){

};

function addDepartment(){

};
function addEmployee(){
    
};