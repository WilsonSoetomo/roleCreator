// GIVEN a command-line application that accepts user input
const inquire = require("inquirer");
const fs = require("fs");
const Manager = require("./classes/Manager");
const Engineer = require("./classes/Engineer");
const Intern = require("./classes/Intern");
const path = require("path");

// Step 1 - Ask the user what role is this person?
// Step 2 -> Create a function that handles Manager
// Step 3 -> Create a function that handles Engineer
// Step 4 -> Create a function that handles Intern

// Starter Func -> What is the role?
// If Engineer -> fun Engineer func
// Are you done? --> yes starterFunc() --> no makeHtml()

function start() {
  inquire
    .prompt([
      {
        name: "chooseRole",
        message: "Would you like to add a role to your profile?",
        type: "list",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((result) => {
      switch (result.chooseRole) {
        case "Engineer":
          makeEngineer();
          break;
        case "Intern":
          makeIntern();
          break;
      }
    });
}

const profiles = [];
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
function prompt() {
  inquire
    .prompt([
      {
        name: "managerName",
        message: "What is your team manager's name?",
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
        name: "officeNo",
        message: "What is your office number?",
        type: "insert",
      },
      // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
      {
        name: "chooseRole",
        message: "Would you like to add a role to your profile?",
        type: "list",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then(async (result) => {
      console.log(result);
      const manager = new Manager(
        result.managerName,
        result.employeeId,
        result.emailAddress,
        result.officeNo
      );
      profiles.push(manager);
      switch (result.chooseRole) {
        case "Engineer":
          await makeEngineer(result);
          break;
        case "Intern":
          makeIntern(result);
          break;
      }
    });
}
function askAgain() {
  inquire
    .prompt([
      {
        name: "chooseRole",
        message: "Would you like to add a role to your profile?",
        type: "list",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((result) => {
      switch (result.chooseRole) {
        case "Engineer":
          makeEngineer();
          break;
        case "Intern":
          makeIntern();
          break;
      }
    });
}
function makeEngineer(result) {
  return inquire
    .prompt([
      {
        name: "managerName",
        message: "What is your name?",
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
        name: "github",
        message: "What is your github username?",
        type: "insert",
      },
      {
        name: "finishRole",
        message: "Would you like to finish?",
        type: "confirm",
      },
    ])
    .then((result) => {
      console.log(result);
      const engineer = new Engineer(
        result.managerName,
        result.employeeId,
        result.emailAddress,
        result.github
      );
      profiles.push(engineer);
      console.log(result.finishRole);
      if (result.finishRole) {
        makeHtml();
      } else {
        askAgain();
      }
    });
}
function makeIntern(result) {
  inquire
    .prompt([
      {
        name: "managerName",
        message: "What is your name?",
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
        name: "school",
        message: "Where did you go to school?",
        type: "insert",
      },
      {
        name: "finishRole",
        message: "Would you like to finish?",
        type: "confirm",
      },
    ])
    .then(async (result) => {
      console.log(result);
      const intern = new Intern(
        result.managerName,
        result.employeeId,
        result.emailAddress,
        result.school
      );
      profiles.push(intern);
      if (result.finishRole) {
        makeHtml();
      } else {
        askAgain();
      }
    });
}
function makeHtml() {
  fs.writeFileSync(path.join(__dirname, "roleCreator.html"), generateHtml());
}
function generateHtml() {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="container">
    ${profiles.map(createCard).join("")}
  </div>
</body>
</html>
    `;
}
function createCard(employee) {
  console.log(employee);
  const role = employee.getRole();
  let additionalProp;
  switch (role) {
    case "Manager":
      additionalProp = `<h2>Office Number: ${employee.getOfficeNo()}</h2>`;
      break;
    case "Engineer":
      additionalProp = `<a href="https://github.com/${employee.getGithub()}" target="_blank""><button class="btn draw-border">Github : ${employee.getGithub()}</button>`;
      break;
    default:
      additionalProp = `<h2>School: ${employee.getSchool()}</h2>`;
      break;
  }
  return `
    <div class="card">
      <img
        src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no"
        alt="Person"
        class="card__image"
      />
      <div class="details">
        <h1>
          ${employee.name}
        </h1>
        <h2>
          ${role}
        </h2>
        <h3> id: ${employee.id}</h3>
      </div>
      <a href="mailto:${employee.email}" target="_blank">
        <div class="btn draw-border">${employee.email}</div>
      </a> 
      ${additionalProp}
    </div>
    `;
}

prompt();

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
