use employee_db;

-- Add department
insert into department (
    id int not null primary key,
    name varchar(30) not null
);

-- Add role
insert into role (
    id int not null primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id int not null
);

-- Add employee
insert into employee (
    id int primary key not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int
);

-- View department
select * from department;

select * from role;

select * from employee;

-- Update
update employee set role = ? where role = ?; 