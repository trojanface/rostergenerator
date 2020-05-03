//Importing required objects/dependencies/scripts
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Question = require("./lib/Question");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
//creating output path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//creates an empty employees array to add new employees to.
let employees = [];
//The welcome message that begins the series of questions.
console.log("\nWelcome to team roster generator!\n")
addEmployee();
async function addEmployee() {
    try {
        let questData;
        if (employees.length === 0) {//If there are no entries yet then it asks about the manager first
           console.log("Please answer the following questions about the manager of the team.\n")
           mainQuestions("Manager");//launches the questions function with the manager type.
        } else {
            questData = await inquirer.prompt([//If there are entries then it prompts if you'd like to add more
                new Question("confirm", "addAnother", "Would you like to add another employee?")
            ]);
            if (questData.addAnother === true) {
                employeeType();//Launches the type question to clarify what type of employee you're adding.
            } else {
    
                if (employees.length > 0) { //If you don't want to add more employees then it will generate the HTML template
                    console.log("\nGenerating your roster HTML");
                    fs.writeFile(outputPath, render(employees), (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    fs.writeFile(path.join(OUTPUT_DIR, "style.css"),fs.readFileSync("./style.css"), (err) => {
                        if (err) {
                            throw err;
                        }
                        process.exit();
                    });
                } else {
                    console.log("\nExiting without generating a roster");//If the array is empty then quite the script without trying to generate the HTML.
                    process.exit();
                }
            }
        }
        
    } catch (err) {
        throw err;
    }
}

async function employeeType() {//Clarifies which type of employee you'd like to enter.
    try {
        const questData = await inquirer.prompt([
            new Question("input", "employeeTypeQ", "What type of employee would you like to add? (Engineer, Intern)")

        ]);
        questData.employeeTypeQ = `${questData.employeeTypeQ[0].toUpperCase()}${questData.employeeTypeQ.substring(1)}`;
        mainQuestions(questData.employeeTypeQ);
    } catch (err) {
        throw err;
    }
}

async function mainQuestions(role) {//The few questions that are common no matter the type of employee
    try {
        const questData = await inquirer.prompt([
            new Question("input", "employeeName", "Employee name:"),
            new Question("input", "employeeID", "Employee id:"),
            new Question("input", "employeeEmail", "Employee email address:")
        ]);
        specialisedQuestions(role, questData);
    } catch (err) {
        throw err;
    }
}

async function specialisedQuestions(role, data) {//A function that asks questions depending upon the type of employee selected.
    let questData;
    try {
        switch (role) {

            case ("Manager"):
                questData = await inquirer.prompt([
                    new Question("input", "specificInfo", "Office number:")
                ]);
                employees.push(new Manager(data.employeeName, data.employeeID, data.employeeEmail, questData.specificInfo));
                break;
            case ("Engineer"):
                questData = await inquirer.prompt([
                    new Question("input", "specificInfo", "Github username:")
                ]);
                employees.push(new Engineer(data.employeeName, data.employeeID, data.employeeEmail, questData.specificInfo));
                break;
            case ("Intern"):
                questData = await inquirer.prompt([
                    new Question("input", "specificInfo", "School:")
                ]);
                employees.push(new Intern(data.employeeName, data.employeeID, data.employeeEmail, questData.specificInfo));
                break;
            default:
        }
        addEmployee();
    } catch (err) {
        throw err;
    }
}

