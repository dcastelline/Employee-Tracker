// Initial prompt
const init = () => {
    inquirer
        .prompt([
            {
                name: 'initial',
                type: 'list',
                message: 'What would you like to do?',
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Department', 'View Role', 'View Employee', 'Update Role', 'Exit'],
            }
        ]);
};

// Add department
const addDept = () => {
    inquirer
        .prompt([
            {
                name: 'addDeptName',
                type: 'input',
                message: 'What is the name of the department you want to add?',
            },
        ]);
};

// Add role
const addRole = () => {
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
        ]);
};

// Add employee
const addEmployee = () => {
    inquirer
        .prompt([
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
                name: 'addEmpRole',
                type: 'input',
                message: "What is the employee's role?",
            },
            {
                name: 'addEmpManager',
                type: 'input',
                message: "Who is the employee's manager?",
            },
        ]);
}

// View department
const viewDept = () => {
    inquirer
        .prompt([
            {
                name: 'viewDept',
                type: 'list',
                message: 'Which department would you like to view?',
                choices: [],
            },
        ]);
}

// View role
const viewRole = () => {
    inquirer
        .prompt([
            {
                name: 'viewRole',
                type: 'list',
                message: 'Which role would you like to view?',
                choices: [],
            },
        ]);
};

// View employee
const viewEmp = () => {
    inquirer
        .prompt([
            {
                name: 'viewEmp',
                type: 'input',
                message: 'Which employee would you like to view?',
            },
        ])
}

// Update role
const updateRole = () => {
    inquirer
        .prompt([
            {
                name: 'updateWho',
                type: 'input',
                message: "Whose role would you like to update?",
            },
            {
                name: 'updateRole',
                type: 'input',
                message: "What is the employee's updated role?",
            },
        ]);
};
