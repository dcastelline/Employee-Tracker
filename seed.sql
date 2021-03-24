use employee_db;

-- Add department
insert into department (name)
value ("Managemnent");
insert into department (name)
value ("Sales");
insert into department (name)
value ("Accounting");

-- Add role
insert into department (title, salary, department_id)
value ("Manager", 100000, 1);
insert into department (title, salary, department_id)
value ("Salesperson", 75000, 2);
insert into department (title, salary, department_id)
value ("Accountant", 60000, 3);



-- Add employee
insert into employee (first_name, last_name, manager_id, role_id)
value ("Big", "Boss", null, 1);
insert into employee (first_name, last_name, manager_id, role_id)
value ("Solid", "Snake", 1, 2);
insert into employee (first_name, last_name, manager_id, role_id)
value ("Metalgear", "Rex", 1, 3);
