//inserting Departments
INSERT INTO department (department)
VALUE ('Accounting');
INSERT INTO department (department)
VALUE ('Management');
INSERT INTO department (department)
VALUE ('Service');
INSERT INTO department (department)
VALUE ('Sales');


//inserting Roles
INSERT INTO role (id, title, salary, department_id)
VALUE (1,'Accountant', 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE (2,'Supervisor', 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE (3,'Sales', 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUE (4'Customer Service', 30000, 3);


//inserting employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1", "Zakaria", "Aqmed", "2", null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("2", "Yantu", "Ebe", "3", null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("3", "Maxa", "Million", "1", null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("4", "John", "Baxster", "4", null);


