var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");

async function main(){

console.log(`starting`);
const userResponse = await inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github user name?",
      name: "username"
    },  
    {
      type: "input",
      message: "What is your project title?",
      name: "projectTitle"
    },  
    {
      type: "input",
      message: "Please provide a detialed description of your project.",
      name: "projectDescription"
    },
    {
        type: "input",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
        name: "installation"
    },
    {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "usage"
    },
    {
        type: "input",
        message: "List your collaborators, if any, with links to their GitHub profiles.\nIf you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.\nIf you followed tutorials, include links to those here as well.",
        name: "credits"
    },
    {
        type: "input",
        message: "If you would like to add a licence for you respository, please input the one you would like here. Otherwise, proceed by clikcing enter",
        name: "license"
    },
    {
        type: "input",
        message: "If you would like write tests for your application. Then provide examples on how to run them. Otherwise, proceed by clikcing enter",
        name: "tests"
    },
        
    
  ])

  let userName = userResponse.username;
  console.log(`Username: ${userName}`)

const apiURL = `https://api.github.com/users/${userName}`

let result = await axios.get( apiURL )
const gitData = result.data;

const name = gitData.name;
const url = gitData.url;
const img = gitData.avatar_url;
const email = gitData.email;
console.log('Name: ' + name);
console.log('url: ' + url);
console.log(`Done`)


fs.writeFile("README.md", 
`![badmath](https://img.shields.io/badge/<hello>-<world>-<ff69b4>)
# ${userResponse.projectTitle}
${userResponse.projectDescription}

* [Installation](#Installation)
* [Usage](#Usage)
* [Credits](#Credits)
* [License](#License)
* [Tests](#Tests)

## Installation
${userResponse.installation}

## Usage
${userResponse.usage}

## Credits
${userResponse.credits}

## License 
${userResponse.license}

## Tests
${userResponse.tests}

##Questions 
![GitHub Logo](${img})
Format: ![Alt Text](url)
Email: ${email}

`
, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("Success! Created your file in info.txt");

});
};

main();
