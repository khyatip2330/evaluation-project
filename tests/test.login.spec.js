const { test, expect } = require('../utils/fixtures');

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
    await loginPage.verifyLoginPageHeader();
})

test.describe('Test "Login" functionality', () => {

    test('Verify login is successful with valid credentials', async ({ loginPage, page }) => {
        await loginPage.enterLoginDetails(process.env.EMAIL, process.env.PASSWORD);
        await loginPage.clickLoginButton();

        await expect(page).toHaveURL('https://app-evaluation-6k3s8p.azurewebsites.net/');
        await expect(page.locator('h1')).toContainText('Khyati Patel');
    });

    test('Verify login is unsuccessful with invalid credentials', async ({ loginPage, page }) => {
        await loginPage.enterLoginDetails(process.env.EMAIL, '123');
        await loginPage.clickLoginButton();

        await expect(page.locator('ul > li')).toContainText([`The credentials provided could not be validated.`]);
    });

    test('Verify error if empty fields on login', async ({ loginPage, page }) => {
        await loginPage.enterLoginDetails(process.env.EMAIL, '');
        await loginPage.clickLoginButton();

        await expect(page.locator('ul > li')).toContainText([`The Password field is required.`]);
    });
})