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
    console.log(`connected as id ${connection.threadId}\n`);
    init();
});

