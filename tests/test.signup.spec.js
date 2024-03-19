const { test, expect } = require('../utils/fixtures');

test.beforeEach(async ({ signupPage }) => {
    signupPage.goto();
    signupPage.verifySignupPageHeader();
})

test.describe('Test "Signup" functionality', () => {

    // Will work once as once signed up, will not be able to use same email.
    // test('Verify first time signup is successful', async ({ page }) => {
    //     await signupPage.enterSignupDetails('Khyati', 'Patel', 'khyatip2330+5@gmail.com', 'Khyati@123');
    //     await signupPage.clickSignupButton();
    //     await expect(page).toHaveURL('https://app-evaluation-6k3s8p.azurewebsites.net/');
    // });

    test('Verify signup should be allowed only once', async ({ signupPage, page }) => {
        await signupPage.enterSignupDetails('Khyati', 'Patel', process.env.EMAIL, process.env.PASSWORD);
        await signupPage.clickSignupButton();
        await expect(page.locator('ul > li')).toContainText([`unique index 'IX_Users_Email' has been violated.`]);
    });

    test('Verify error if empty fields on signup', async ({ signupPage, page }) => {
        await signupPage.enterSignupDetails('Khyati', 'Patel', '', process.env.PASSWORD);
        await signupPage.clickSignupButton();
        await expect(page.locator('ul > li')).toContainText([`The Email field is required.`]);
    });
})