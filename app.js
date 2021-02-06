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
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Role'],
            }
        ])
        .then((answers) => {
            switch (answers.choice) {
                case 'Add Department':
                    addDept()
                    break;
                
                case 'Add Role':
                    addRole()
                    break;

                case 'Add Employee':
                    addEmployee()
                    break;
                
                case 'View Department':
                    viewDept()
                    break;

                case 'View Role':
                    viewRole()
                    break;

                case 'View Employee':
                    viewEmp()
                    break;

                case 'Update Role':
                    updateRole()
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    connection.end()
                    break;
            }
        });
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
        .then((response) => {
            connection.query('INSERT INTO department (name) VALUES (?)', [res.newDept], (err, data) => {
                if (err) throw err;
                console.table('Department added');
                init();
            })
        })
}

// // Add role
// const addRole = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'addRoleName',
//                 type: 'input',
//                 message: 'What is the name of the role you want to add?',
//             },
//             {
//                 name: 'roleSalary',
//                 type: 'input',
//                 message: 'What is the salary for this role?',
//             },
//         ])
//         .then((answer) => {
//             connection.query(`INSERT INTO role (name) VALUES (${answer.role})`, (err, res) => {
//                 if (err) throw err;
//                 console.log('Added: ' + res);
//                 getRoles();
//                 init();
//             })
//         });
// };

// // Add employee
// const addEmployee = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'addEmpDept',
//                 type: 'list',
//                 message: 'What department does the employee work in?',
//             },
//             {
//                 name: 'addEmpRole',
//                 type: 'list',
//                 message: "What is the employee's role?",
//             },
//             {
//                 name: 'addEmpFirstName',
//                 type: 'input',
//                 message: "What is the employee's first name?",
//             },
//             {
//                 name: 'addEmpLastName',
//                 type: 'input',
//                 message: "What is the employee's last name?",
//             },
//             {
//                 name: 'addEmpManager',
//                 type: 'input',
//                 message: "Who is the employee's manager?",
//             },
//         ])
//         .then((answer) => {
//             connection.query(`INSERT INTO employee (name) VALUES (${answer.employee})`, (err, res) => {
//                 if (err) throw err;
//                 console.log('Added: ' + res);
//                 getRoles();
//                 init();
//             })
//         });
// };

// // View department
// const viewDept = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'viewDept',
//                 type: 'list',
//                 message: 'Which department would you like to view?',
//                 choices: [],
//             },
//         ])
//         .then((answer) => {
//             const query = 'SELECT name FROM department WHERE ?';
//             connection.query(query, { department: answer.department }, (err, res) => {
//                 res.forEach(({ name }) => {
//                     console.log(`Department: ${name}`);
//                 });
//                 init();
//             });
//         });
// };

// // View role
// const viewRole = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'viewRole',
//                 type: 'list',
//                 message: 'Which role would you like to view?',
//                 choices: [],
//             },
//         ])
//         .then((answer) => {
//             const query = 'SELECT name FROM role WHERE ?';
//             connection.query(query, { role: answer.role }, (err, res) => {
//                 res.forEach(({ name }) => {
//                     console.log(`Role: ${name}`);
//                 });
//                 init();
//             });
//         });
// };

// // View employee
// const viewEmp = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'viewEmp',
//                 type: 'input',
//                 message: 'Which employee would you like to view?',
//             },
//         ])
//         .then((answer) => {
//             const query = 'SELECT name FROM employee WHERE ?';
//             connection.query(query, { employee: answer.employee }, (err, res) => {
//                 res.forEach(({ name }) => {
//                     console.log(`Employee: ${name}`);
//                 });
//                 init();
//             });
//         });
// }

// // Update role
// const updateRole = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'updateWho',
//                 type: 'input',
//                 message: "Whose role would you like to update?",
//             },
//             {
//                 name: 'updateRole',
//                 type: 'input',
//                 message: "What is the employee's updated role?",
//             },
//         ])
//         .then((answer) => {
//             connection.query('UPDATE role SET role = ? WHERE id = ?'), (err, data) => {
//                 if (err) throw err;
//                 init();
//             }
//         });
// };