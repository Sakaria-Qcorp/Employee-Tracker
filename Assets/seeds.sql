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
INSERT INTO role (title, salary, department_id)
VALUE ('Accountant', 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Supervisor', 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales', 60000, 4);