// Require inquirer for prompts, mysql to talk to database, and consol.table 
const inquirer = require('inquirer');
const mysql = require('mysql');

// Establish connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'CastleSQL32!@',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
});

// Prompts
// Initial prompt
const init = () => {
    inquirer
        .prompt([
            {
                name: 'initial',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Role', 'End']
            }
        ])
        .then((val) => {
            switch (val.initial) {
                case 'Add Department':
                    addDept();
                    break;
                
                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;
                
                case 'View Departments':
                    viewDept();
                    break;

                case 'View Roles':
                    viewRole();
                    break;

                case 'View Employees':
                    viewEmp();
                    break;

                case 'Update Roles':
                    updateRole();
                    break;

                case 'End':
                    connection.end();
                    break;
            }
        })
};

// Add functions
// Add department
const addDept = () => {
    const depts = [];
    inquirer
        .prompt([
            {
                name: 'department',
                type: 'input',
                message: 'What is the name of the department you would like to add?'
            }
        ])
        .then((res) => {
            connection.query('INSERT INTO department SET ?', { name: res.name }, (err) => {
                if (err) throw err
                for (let i = 0; i < depts.length; i++);
                depts.push()
                console.table(res);
                init();
            })
        })
}

// // Add role
const addRole = () => {
    connection.query('SELECT role.title AS Title FROM role'), (err, res) => {
        inquirer
            .prompt([
                {
                    name: 'Title',
                    type: 'input',
                    message: 'What is the title of the role you want to add?',
                },
                {
                    name: 'Salary',
                    type: 'number',
                    message: 'What is the salary for this role?',
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'What is the department ID for this role?',
                    choices: depts
                },
            ])
            .then((res) => {
                let deptId = depts().indexOf(res.depts) + 1;
                console.log(res);
                connection.query('INSERT INTO role SET ?', {
                    title: res.Title,
                    salary: res.Salary,
                    department_id: deptId,
                },
                (err) => {
                    if (err) throw err;
                    console.table(res);
                    init();
                })
            })
    }
};

// // Add employee
const addEmployee = () => {
    let roles = [];
    const pickRole = () => {
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                roles.push(res[i].title);
            }
        })
    }
    inquirer
        .prompt([
            {
                name: 'EmpFirstName',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'EmpLastName',
                type: 'input',
                message: "What is the employee's last name?",
            },
            {
                name: 'role',
                type: 'list',
                message: "Who is the employee's role?",
                choices: pickRole()
            },
        ])
        .then((input) => {
            let empRoleId = pickRole().indexOf(input.role) + 1;
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: input.EmpFirstName,
                    last_name: EmpLastName,
                    role_id: empRoleId,
                },
                (err) => {
                if (err) throw err;
                console.table(input);
                init();
            })
        })
}

// // View department
const viewDept = () => {
    connection.query('SELECT employee.EmpFirstName, employee.EmpLastName, department.name AS department FROM employee JOIN role ON employee.role_id JOIN department ON role.department_id ORDER BY employee.id', (err, res) => {
        if (err) throw err;
            console.table(res);
            init();
        });
};

// // View role
const viewRole = () => {
    connection.query('SELECT employee.EmpFirstName, employee.EmpLastName, department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id', (err, res) => {
        if (err) throw err;
            console.table(res);
            init();
        });
};

// // View employee
const viewEmp = () => {
    connection.query("SELECT employee.EmpFirstName, employee.EmpLastName, role.title, role.salary, department.name, CONCAT(e.EmpFirstName, '', e.EmpLastName) AS manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id", (err, res) => {
        if (err) throw err;
            console.table(res);
            init();
        });
}

// // Update role
const updateRole = () => {
    connection.query('SELECT employee.first_name, employee.last_name, employee.role_id, role.title FROM employee JOIN role ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res)
            inquirer
                .prompt([
                    {
                        name: 'updateWho',
                        type: 'list',
                        message: "Whose role would you like to update?",
                        choices: () => {
                            let EmpLastName = [];
                            for (let i = 0; i < res.length; i++) {
                                EmpLastName.push(res[i].last_name);
                            }
                            return EmpLastName;
                        }
                    },
                    {
                        name: 'updateRole',
                        type: 'list',
                        message: "What is the employee's updated role?",
                        choices: pickRole()
                    },
                ])
                .then((val) => {
                    console.log(val);
                    connection.query('UPDATE employee SET ? WHERE ?',
                        [
                            {
                                role_id: roleId
                            },
                            {
                                last_name: val.EmpLastName,
                            }
                        ],
                        (err) => {
                            if (err) throw err;
                            console.table(val);
                            init();
                        })
                })
    })
};