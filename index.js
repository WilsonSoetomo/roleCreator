// GIVEN a command-line application that accepts user input
const inquire = require("inquirer");
const fs = require("fs");

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
inquire.prompt([
    {
        name: "managerName",
        message: "What is your manager's name?",
        type: "input",
    },
    {
        name: "employeeId",
        message: "What is your employee ID?",
        type: "input",
    },
    {
        name: "emailAddress",
        message: "What is your email address?",
        type: "insert",
    },
    {
        name: "officeNumber",
        message: "What is your office number?",
        type: "insert",
    },
    // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
    {
        name: "chooseRole",
        message: "Would you like to add a role to your profile?",
        type: "list",
        choices:["Engineer","Intern","Finish Profile"],
    },
]).then(result => {
    console.log(result)
    switch(result.chooseRole){
        case "Engineer": 
        makeEngineer()
        break;
        case "Intern":
        makeIntern()
        break;
        default: 
        makeHtml()
    }
});


// WHEN I select the engineer option

// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated




// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab