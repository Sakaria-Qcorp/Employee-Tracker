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
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "Exit"]
        },

    ]).then((response) => {
        if (response.prompt === "View all departments") {
           viewDepartments();
        };
        if (response.prompt === "View all roles") {
            viewRoles();
        };
        if (response.prompt === "View all employees") {
            viewEmployees();
        };

        if (response.prompt === "Add a department") {
            addDepartment();
         };
         if (response.prompt === "Add a role") {
            getDeptpartments();
         };
         if (response.prompt === "Add an employee") {
            getEmployeeInfo();
         };
         if (response.prompt === "Update an employee") {
           findEmployeeName();
        };
        if (response.prompt === "Exit") {

            console.log("Good Bye!!")
           
        };
    });

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
        console.table('  ', res);
        openningQuestion();
    })

};
function getDeptpartments () {
    let mySQL =  
    `SELECT department_id, department_name FROM department;`

    connection.query(mySQL, function (err, res){
        if (err) throw err;        
        const departments = [];
        const dept_Id = [];
        for (let i = 0; i < res.length; i++) {
            departments.push(res[i].department_name)
            dept_Id.push(res[i].department_id)
        }

        addRole(departments, dept_Id)

    })
};
function viewEmployees(){
    let mySQL =  
     `SELECT employee.id, 
     employee.first_name, employee.last_name, 
     role.title, role.salary, department.department_name
      FROM employee INNER JOIN role ON employee.role_id = role.role_id 
      INNER JOIN department ON role.role_id = department.department_id;`
     connection.query(mySQL, function (err, res){
        if (err) throw err;

        console.table('All Employees', res);
        openningQuestion();
    })

};
function addRole(departments,dept_id){
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What role would you like to create?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department is it under?",
            choices: departments
        },
        {
            type: "input",
            name: "salary",
            message: "What is the annual salary for this position?",
        },
    ]).then((data)=>{

        let Num_id;
        departments.forEach((deptName, index) =>{
            const dept = dept_id[index];
           

            if (deptName === `${data.department}`){
                Num_id = dept;
            }

        })

        const query = connection.query(
            "INSERT INTO role SET ?",
            {   
                title: `${data.role}`,
                salary: `${data.salary}`,
                department_id: `${Num_id}`

            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Role Added!");
                openningQuestion();
            }
        )  
    })


};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department you would like to add?"
        },
    ]).then((data)=>{
        const query = connection.query(
            "INSERT INTO department SET ?",
            {   
                department_name: `${data.department}`,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department Added!");
                openningQuestion();
            }
        )  
    })

};

function getEmployeeInfo () {
    let mySQL =  
    `SELECT role_id, title FROM role`;

    connection.query(mySQL, function (err, res){
        if (err) throw err;
            
        const title = [];
        const id_role = [];
        for (let i = 0; i < res.length; i++) {
            title.push(res[i].title)
            id_role.push(res[i].role_id)
        }

     
        addEmployee (title, id_role)

    })
};
function addEmployee(title, id_role) {

    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id number?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employees role with the company?",
            choices: title
        },
    ]).then((data) => {

        let role_id;
        title.forEach((title, index) =>{
            const role = id_role[index];

            if (title === `${data.role}`){
                role_id = role;
            }

        })
     const query = connection.query(
            "INSERT INTO employee SET ?",
            {   
                id: `${data.id}`,
                first_name: `${data.first}`,
                last_name: `${data.last}`,
                role_id: `${role_id}`,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee Added sucessfully!");
                openningQuestion();
            }
        )       
    })
}
}

    function findEmployeeName () {
        let sql =  
        `SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary, role.role_id
         FROM employee INNER JOIN role 
         ON employee.role_id = role.role_id 
         INNER JOIN department 
         ON role.department_id = department.department_id;`;
    
        connection.query(sql, function (err, res){
            if (err) throw err;
                  
            const names = [];
            const roles = [];
            const roles_id = [];
            for (let i = 0; i < res.length; i++) {
                names.push(res[i].first_name +" "+res[i].last_name)
                roles.push(res[i].title)
                roles_id.push(res[i].role_id)
            }
            changeEmployeeInfo(names, roles, roles_id);
        })
    }
    
    
    function changeEmployeeInfo(names, roles, roles_id) {
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which Employee would you like to update?",
                choices: names
            },
    
        ]).then((data) =>{
            
            let mySQL = 
            `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '${data.name}'`
    
            connection.query(mySQL, function (err, res){
                if (err) throw err;
                const num_Id = parseInt((res[0].id))
                updateEmployee(num_Id, roles, roles_id)
            })
        })
    };
    
    function updateEmployee (num_Id, roles, roles_id) {
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices:roles
               
            }
        ]).then((data) => {
            let newtId;
    
            roles.forEach((array, index) =>{
                const num = roles_id[index];
                
                if (array === `${data.role}`){
                    newtId = num;
                }
            })
            console.log(newtId);
            const query = connection.query(
            "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: `${newtId}`
                    },
                    {
                        id: `${num_Id}`
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee Role updated")
                   openningQuestion();
                }
            )
        })
        
    };
    

