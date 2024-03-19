# Evaluation Project
 
## Overview
This is playwright tests. It involves testing project management application.
 
## Prerequisites
You will need the following things properly installed on your computer.
* [Git](https://git-scm.com/)
* [nodejs](https://nodejs.org/en/download)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Installation steps
* Go to project root directory
* `npm init` to setup and install package from package.json

## Implementation
* Page Object Model is used as it is effecient and maintainable. 
* Fixtures are used in order to reuse code
* Login, Signup, Project and Task functionalities test cases are added
* Credentials picked up from environment variables (.env file). We can use Azure Key Vault as well for the same.

## Test execution
* `npx playwright test` to run tests in headless mode
* `npx playwright test --ui` to run tests on UI mode
* `npx playwright test show-report` to view report in html format

## Test reports
Test execution reports are found under playwright-report folder.