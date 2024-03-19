const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginHeader = page.locator('h3', { hasText: 'Login' });
    this.emailInputField = page.getByPlaceholder('Your Email');
    this.passwordInputField = page.getByPlaceholder('Your Password');
    this.loginButton = page.getByRole('button', {name: 'Login '});
    this.errorMessage = page.locator('ul > li');
  }

  async goTo() {
    await this.page.goto('https://app-evaluation-6k3s8p.azurewebsites.net/'); 
  }

  async verifyLoginPageHeader() {
    await this.loginHeader.isVisible();
  }

  async enterLoginDetails(email, password) {
    await this.emailInputField.fill(email);
    await this.passwordInputField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.isVisible();
    await this.loginButton.click();
  }

};