const base = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { SignupPage } = require('../pages/signup');
const { ProjectsPage } = require('../pages/projectTab/projects');
const { TaskPage } = require('../pages/projectTab/tasks')


exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    projectsPage: async ({ page }, use) => {
        await use(new ProjectsPage(page));
    },
    taskPage: async ({ page }, use) => {
        await use(new TaskPage(page));
    },
});

exports.expect = base.expect;