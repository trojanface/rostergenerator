const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Question = require("./lib/Question");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
//asks what type of team member you're adding
//asks common questions
//asks specialised questions depending on type of member
//returns a created object --can test that the object is created properly
//in main script the created objects are stored in an array, once finished it loops over the array and generates html from it.
//asks if you want to add another member if not then it tells main script to generate otherwise it calls its question method again.
console.log("\nWelcome to team roster generator!\n")
addEmployee();
async function addEmployee() {
    try {
        let questData;
        if (employees.length === 0) {
        questData = await inquirer.prompt([
            new Question("confirm","addAnother","Would you like to add an employee?")
        ]);
    } else {
        questData = await inquirer.prompt([
            new Question("confirm","addAnother","Would you like to add another employee?")
        ]);
    }
        if (questData.addAnother === true) {
            employeeType();
        } else {
            console.log("\nExiting now"); //this will instead redirect to the gernate html function
                process.exit();
        }
    } catch (err) {
        throw err;
    }
}

async function employeeType() {
    try {
        const questData = await inquirer.prompt([
            
                new Question("input","employeeType","What type of employee would you like to add? (Manager, Engineer, Intern)")
                
        ]);
        for (property in questData) {//capitalises position title.        
            questData[property] = `${questData[property][0].toUpperCase()}${questData[property].substring(1)}`;
        }
        mainQuestions(questData[property]);
    } catch (err) {
        throw err;
    }
}

async function mainQuestions(role) {
    try {
        const questData = await inquirer.prompt([
            new Question("input","employeeName","Employee name:"),
            new Question("input","employeeID","Employee id:"),
            new Question("input","employeeEmail","Employee email address:")
        ]);
        specialisedQuestions(role, questData);
    } catch (err) {
        throw err;
    }
}

async function specialisedQuestions(role, data) {
    console.log(data);
    let questData;
    try {
        switch (role) {

            case ("Manager"):
                questData = await inquirer.prompt([
                    new Question("input","specificInfo","Office number:")
                ]);
                break;
            case ("Engineer"):
                questData = await inquirer.prompt([
                    new Question("input","specificInfo","Github username:")
                ]);
                break;
            case ("Intern"):
                questData = await inquirer.prompt([
                    new Question("input","specificInfo","School:")
                ]);
                break;
            default:
        }

        employees.push(generateMember(data.employeeName, data.employeeID, data.employeeEmail, role, questData.specificInfo));
        addEmployee();
    } catch (err) {
        throw err;
    }
}

function generateMember(name, id, email, role, specificV) {
    switch (role) {
        case "Employee":
            return new Employee(name, id, email)
            break;
        case "Engineer":
            return new Engineer(name, id, email, specificV)
            break;
        case "Intern":
            return new Intern(name, id, email, specificV)
            break;
        case "Manager":
            return new Manager(name, id, email, specificV)
            break;
        default:

            break;
    }

}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
