const { expect } = require('@playwright/test');

exports.TaskPage = class TaskPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addNewTaskButton = page.getByRole('button', { name: ' Add New Task ' });
    this.cardTitle = page.locator('header > p', { hasText: 'Add Project' });
    this.taskTitleInputField = page.locator('[placeholder="Title"]');
    this.taskMoreOption = page.getByLabel('more options'); 
    this.openTask = page.locator(".dropdown-content > a").first();
    this.taskDescInputfield = page.getByPlaceholder('Description');
    this.notesInputfield = page.getByPlaceholder('Notes');
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.cancelButton = page.getByText('Cancel');
    this.deleteTask = page.locator('a[class="dropdown-item"]').last();
    this.errorMessage = page.locator('.notification is-danger > ul > li').first();
  }

  async clickAddNewTaskButton() {
    await this.addNewTaskButton.isVisible();
    await this.addNewTaskButton.click();
  }

  async enterTaskTitle(title) {
    await this.taskTitleInputField.fill(title);
  }

  async clickOpenTask() {
    await this.taskMoreOption.click();
    await this.openTask.click();
  }

  async enterTaskDescription(desc) {
    await this.taskDescInputfield.fill(desc);
  }

  async enterTaskTitle(title) {
    await this.taskTitleInputField.fill(title);
  }

  async clickOkButton() {
    await this.okButton.isVisible();
    await this.okButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.isVisible();
    await this.cancelButton.click();
  }

  async clickDeleteTask() {
    await this.taskMoreOption.click();
    await this.deleteTask.isVisible();
    await this.deleteTask.click();
  }

};