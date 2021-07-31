
INSERT INTO department (department_name)
VALUE ('Accounting');
INSERT INTO department (department_name)
VALUE ('Management');
INSERT INTO department (department_name)
VALUE ('Service');
INSERT INTO department (department_name)
VALUE ('Sales');


INSERT INTO role ( title, salary, department_id)
VALUE ('Accountant', 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Supervisor', 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Sales', 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ('Customer Service', 30000, 3);


INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ( "Zakaria", "Aqmed",1, null);
INSERT INTO employee ( first_name, last_name,role_id, manager_id)
VALUES ( "Yantu", "Ebe",2,null);
INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ( "Maxa", "Million",3, null);
INSERT INTO employee ( first_name, last_name,role_id, manager_id)
VALUES ( "John", "Baxster",4, null);


