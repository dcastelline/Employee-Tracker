// Require inquirer for prompts, mysql to talk to database, and consol.table 
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Establish connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'CastleSQL32!@',
    database: 'employee_db',
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
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Role']
            }
        ])
        .then((answer) => {
            switch (answer.action) {
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

                default:
                    console.log('You must pick another option.');
                    connection.end();
                break;
            }
        })
};

// Add functions
// Add department
const addDept = () => {
    inquirer
        .prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'What is the name of the department you would like to add?'
            }
        ])
        .then((data) => {
            connection.query('INSERT INTO department SET ?', { newDept: data.newDept }, (err) => {
                if (err) throw err;
                console.log(`Added ${data.newDept}.`);
                init();
            })
        })
}

// // Add role
const addRole = () => {
    let depts = [];
    connection.query('SELECT department FROM department'), (err, results) => {
        if (err) throw err;
        results.forEach(({ department }) => {
            return depts.push(department);
        });
        inquirer
            .prompt([
                {
                    name: 'addRoleName',
                    type: 'input',
                    message: 'What is the name of the role you want to add?',
                },
                {
                    name: 'roleSalary',
                    type: 'input',
                    message: 'What is the salary for this role?',
                },
            ])
            .then((data) => {
                const deptId = depts.indexOf(data.addRoleName);
                console.log(deptId);
                connection.query('INSERT INTO role SET ?', {
                    role: data.addRoleName,
                    salary: data.salary,
                    department_id: deptId,
                })
                init();
            })
    }
};

// // Add employee
const addEmployee = () => {
    let roles = [];
    connection.query('SELECT title FROM role', (err, results) => {
        if (err) throw err;
        results.forEach(({ title }) => {
            return roles.push(title);
        });
    inquirer
        .prompt([
            {
                name: 'empRoleId',
                type: 'list',
                message: "What is the employee's role?",
                choices: roles,
            },
            {
                name: 'addEmpFirstName',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'addEmpLastName',
                type: 'input',
                message: "What is the employee's last name?",
            },
            {
                name: 'addEmpManager',
                type: 'input',
                message: "Who is the employee's manager?",
            },
        ])
        .then((data) => {
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: data.addEmpFirstName,
                    last_name: addEmpLastName,
                    role_id: empRoleId,
                },
                (err) => {
                if (err) throw err;
                init();
            })
        })
    })
};

// // View department
const viewDept = () => {
    const departments = [];
    connection.query('SELECT department FROM department', (err, res) => {
        if (err) throw err;
        res.forEach(({ department }) => {
            departments.push({ department });
            console.table(departments);
            init();
        });
    })
};

// // View role
const viewRole = () => {
    const allRoles = [];
    connection.query('SELECT title FROM roles', (err, res) => {
        if (err) throw err;
        res.forEach(({ title }) => {
            allRoles.push({ title });
            console.table(allRoles);
            init();
        });
    })
};

// // View employee
const viewEmp = () => {
    const allEmps = [];
    connection.query('SELECT employee.id, first_name, last_name, title, FROM employee', (err, res) => {
        res.forEach(({ id, first_name, last_name, title }) => {
            if (err) throw err;
            allEmps.push({ id, first_name, last_name, title });
            console.table(allEmps);
            init();
        })
    })
    inquirer
        .prompt([
            {
                name: 'viewEmp',
                type: 'input',
                message: 'Which employee would you like to view?',
            },
        ])
        .then((answer) => {
            const query = 'SELECT name FROM employee WHERE ?';
            connection.query(query, { employee: answer.employee }, (err, res) => {
                res.forEach(({ name }) => {
                    console.log(`Employee: ${name}`);
                });
                init();
            });
        });
}

// // Update role
const updateRole = () => {
    const updateEmps = [];
    const updateRoles = [];
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err;
        res.forEach(({ first_name, last_name }) => {
            return updateEmps.push(`${first_name} ${last_name}`);
        })
        connection.query('SELECT title FROM role', (err, updates) => {
            if (err) throw err;
            updates.forEach(({ title }) => {
                return updateRoles.push(title);
            })
            inquirer
                .prompt([
                    {
                        name: 'updateWho',
                        type: 'input',
                        message: "Whose role would you like to update?",
                    },
                    {
                        name: 'updateRoleId',
                        type: 'input',
                        message: "What is the employee's updated role?",
                    },
                ])
                .then((data) => {
                    const updateWho = updateEmps.indexOf(data.updateEmps);
                    const updateRoleId = updateRoles.indexOf(data.updateRoleId);
                    connection.query('UPDATE employee SET role_id = ? where id = ?', [updateWho, updateRoleId], (err, res) => {
                        if (err) throw err;
                        console.log(`${data.updateWho} updated`);
                        init();
                    })
                })
            })
    })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
});