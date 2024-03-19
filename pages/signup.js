const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.signupHeader = page.locator('h3', { hasText: 'Sign up' });
    this.firstNameInputField = page.getByPlaceholder('Your First Name');
    this.lastNameInputField = page.getByPlaceholder('Your Last Name');
    this.emailInputField = page.getByPlaceholder('Your Email');
    this.passwordInputField = page.getByPlaceholder('Your Password');
    this.confirmPasswordInputField = page.getByPlaceholder('Confirm Password');
    this.signupButton = page.getByRole('button', {name: 'Signup '});
    this.errorMessage = page.locator('ul > li');
  }

  async goto() {
    await this.page.goto('https://app-evaluation-6k3s8p.azurewebsites.net/signup');
  }

  async verifySignupPageHeader() {
    await this.signupHeader.isVisible();
  }

  async enterSignupDetails(firstName, lastName, userEmail, userPassword) {
    await this.firstNameInputField.fill(firstName);
    await this.lastNameInputField.fill(lastName);
    await this.emailInputField.fill(userEmail);
    await this.passwordInputField.fill(userPassword);
    await this.confirmPasswordInputField.fill(userPassword);
  }

  async clickSignupButton() {
    await this.signupButton.isVisible();
    await this.signupButton.click();
  }

};