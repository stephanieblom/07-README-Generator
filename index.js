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
  ])

  let userName = userResponse.username;
  console.log(`Username: ${userName}`)

const apiURL = `https://api.github.com/users/${userName}`

let result = await axios.get( apiURL )
const gitData = result.data;

const name = gitData.name;
const url = gitData.url;
console.log('Name: ' + name);
console.log('url: ' + url);
console.log(`Done`)


fs.writeFile("README.md", 
`![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
# ${userResponse.projectTitle}
# This is an <h1> tag
## This is an <h2> tag
###### This is an <h6> tag`
, function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("Success! Created your file in info.txt");

});
};

main();
