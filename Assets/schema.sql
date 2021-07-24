DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	department_id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(department_id)
);
