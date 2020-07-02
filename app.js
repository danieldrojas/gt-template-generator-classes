const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembersArray = [];

//Prompt questions 
const questionsManager = [
    {
        type: "input",
        message: "Enter manager's name? ",
        name: "name",
        // validate: function (value) {
        //     if (value.length)  return true;
        //      else  return 'Please enter your username or e-mail address.';
    
    },
    {
        type: "input",
        message: "Enter manager id? ",
        name: "id"
    },
    {
        type: "input",
        message: "Enter manager's email? ",
        name: "email"
    },
    {
        type: "input",
        message: "Enter manager's office number? ",
        name: "officeNumber"
    }

]
const questionsEngineer = [
    {
        type: "input",
        message: "Enter engineer name? ",
        name: "name"
    },
    {
        type: "input",
        message: "Enter engineer id? ",
        name: "id"
    },
    {
        type: "input",
        message: "Enter engineer email? ",
        name: "email"
    },
    {
        type: "input",
        message: "Enter engineer's github username? ",
        name: "github"
    }
]
const questionsIntern = [
    {
        type: "input",
        message: "Enter intern name? ",
        name: "name"
    },
    {
        type: "input",
        message: "Enter intern id? ",
        name: "id"
    },
    {
        type: "input",
        message: "Enter intern email? ",
        name: "email"
    },
    {
        type: "input",
        message: "Enter intern school ",
        name: "school"
    }
]

//functions
//function to ask to add more employees




inquirer.prompt(questionsManager).then(answers => {

    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    teamMembersArray.push(manager)
    console.log(teamMembersArray);

    const addMember = function () {
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to add member?",
                name: "anotherMember"
            }
        ]).then(answers => {
            if (answers.anotherMember) {
                typeOfEmployee()

            }

        })

    }

  

    addMember();
    function typeOfEmployee() {
     
 
        inquirer.prompt([
            {
                type: "list",
                message: "Add team member: ",
                name: "role",
                choices: ["Engineer", "Intern"]
            

            }
        ]).then(answers => {
            const role = answers.role


         
        switch (role) {
                case "Engineer":
                    inquirer.prompt(questionsEngineer)
                        .then(answers => {
                            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
                            teamMembersArray.push(engineer)
                            addMember()

                        
                        });
                    break;
                case "Intern":
                    inquirer.prompt(questionsIntern)
                        .then(answers => {
                            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
                            teamMembersArray.push(intern)
                            addMember()
                        })
                
            }
        
        })

        console.log("This is outside", teamMembersArray)


    }


    render(teamMembersArray)


});





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
