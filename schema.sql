drop database if exists employee_db;

create database employee_db;

use employee_db;

create table department (
    id int not null primary key auto_increment,
    name varchar(30)
);

create table role (
    id int not null primary key auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id) references department(id)
);

create table employee (
    id int primary key not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    foreign key (role_id) references role(id)
);