# Unc Inc Assessment - React

This package contains the assessment for a typical React project.

## Requirements

- Yarn 1.22 or higher
- Node 10 or higher
- Git (preferably command line)
- Your editor of choice

## Installation

The directory contains a very basic `create-react-app` setup. Unarchive the package into a directory, and do:

Install all packages:

```
$ yarn install
```

To run the app:

```
$ yarn run start
```

To run the tests:

```
$ yarn run test
```

## Usage

Run the app and confirm that you see an example React app being opened in your browser.

## Assignment

We would like you to develop a Paginator component, e.g. like https://www.w3schools.com/css/css3_pagination.asp. The interaction should be very minimal, at the very least it should have a state of the current page, and an indication of the current page. This component should have props defining how many pages and other options. We would like a very minimal styling (do not spend too much on this).

Secondly, we would also like to test this component using several different situations. We have provided a basic test framework.

## Rules

There is a small set of rules we would like you to adhere to:

- The project needs to be versioned using git. Please make us of a local git repository to keep track of your changes (You need to start a repo by using git init). We try to adhere to Conventional Commits as much as we can.
- Try to adhere to standards as much as you can. Use conventions set by the framework(s). Your code should follow the coding standards.
- Do not write unnecessary code. Use packages or libraries where you can.
- Do not spend too much time on this. Think practically, act as if a client is waiting for your changes.
- If you can not finish the assignment within a reasonable amount of time, just write down your train of thoughts and steps you would like to take. We are looking more into your approach, not so much perfect code.

## Hints

Some hints to help you along the way:

- A testing framework has already been setup, try to make use of that.

## Submission

Create an archive of the full project, including the `.git` folder and database and either email it or transfer it using e.g. WeTransfer or ToffeeShare.

###### Pagination Component

## A pagination Component with states and Props

Tech Stack
React Hooks
JavaScript
CSS

## General Notes

Stuck with react testing for state change for every page, tried with fireevent for button click, fireevent not triggered so the test is not passing (spy,jestfn, simulate).
Need more time for these kind of test cases.
Have followed stackoverflow , react testing library documentation.

## Steps to run the Project

git clone https://github.com/mahavinay/paginationComponent.git
Open the Project Folder
npm install - it will install all dependencies
npm start - it open a browser window to see the application in localhost

## Available Scripts

In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests(https://facebook.github.io/create-react-app/docs/running-tests) for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about https://facebook.github.io/create-react-app/docs/deployment for more information
