const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const pdf = require('html-pdf');
var username;
var color;

// inquirerjs
    // prompt for github username and favorite color

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            name: "color",
            choices: [
                "Blue",
                "Red",
                "Green"
            ]
        }
    ])
    .then((res) => {
        username = res.username;
        color = res.color;

        const queryURL = `https://api.github.com/users/${username}/repos?per_page=100`;

        axios.get(queryURL).then((res) => {
            let profileImg = res.avatar_url;
            let githubProfile = res.url;
            let userBio = res.bio;
            let pubRepos = res.public_repos;
            let followers = res.followers;
            let stars;
            let usersFollowing = res.followers_url;

            let data = generateHTML(profileImg, githubProfile, userBio, pubRepos, followers, stars, usersFollowing);


            fs.writeFile('profile.html', data, (err) => {
                if (err) throw err;
            });
            var html = fs.readFileSync('./index.html', 'utf8');
            var options = {
                format: 'Letter'
            };
            // pdf.create(
            //     fs.writeFile('profile.html', data, (err) => {
            //         if (err) throw err;
            //     })
            // ).toFile("profile.pdf", (err, res) => {
            //     if (err) throw err;
            //     console.log(res);
            // })
            pdf.create(html, options).toFile('./profile.pdf', (err, res) => {
                if (err) return console.log(err);
                console.log(res);
            })
        })
    })

// api call
    // Retreive; 
    // Profile Image
    // Github profile 
    // User bio
    // Number of public respoistories
    // Number of followers
    // Number of github stars
    // number of users following

// Write as HTML then convert to PDF
function generateHTML(profileImg, githubProfile, userBio, pubRepos, followers, stars, usersFollowing) {


    // Only add code between the quotes below NOTHING ELSE
    // Install mongodb and that one other thing that goes with it
    return `<html>
    <div>
    
    </div>
    </html>`;
}
// Generate a pdf file output (use fs)