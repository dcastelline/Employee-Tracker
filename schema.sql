create database employee_db;

use employee_db;

create table department (
    id int not null primary key,
    name varchar(30) not null
);

create table role (
    id int not null primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id int not null
);

create table employee (
    id int primary key not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);