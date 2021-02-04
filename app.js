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
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Role'],
            }
        ]);
};