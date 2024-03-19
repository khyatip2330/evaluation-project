const { expect } = require('@playwright/test');

exports.ProjectsPage = class ProjectsPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.projectHeader = page.locator('h1 > span', { hasText: ' Projects' });
    this.addNewProjectButton = page.getByRole('button', { name: ' Add New Project ' });
    this.cardTitle = page.locator('header > p', { hasText: 'Add Project' });
    this.NameInputField = page.getByPlaceholder('Name');
    this.clientInputField = page.getByPlaceholder('Client');
    this.clientDropdownField = page.locator(".dropdown-content > a");
    this.stageInputField = page.locator('select');
    this.descInputfield = page.getByPlaceholder('Description');
    this.notesInputfield = page.getByPlaceholder('Notes');
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.cancelButton = page.getByText('Cancel');
    this.editProject = page.locator('//div[@class="dropdown-content"]/a[2]');
    this.deleteProject = page.locator('//div[@class="dropdown-content"]/a[3]');
    this.sortByCreatedDate = page.locator('a', { hasText: 'Created' });
    this.actionIconButton = page.locator('table > tbody > tr').locator('td').nth(5);
  }

  async goToProjectsUrl() {
    await this.page.goto('https://app-evaluation-6k3s8p.azurewebsites.net/projects');
  }

  async verifyProjectPageHeader() {
    await this.projectHeader.isVisible();
  }

  async clickNewProjectButton() {
    await this.addNewProjectButton.isVisible();
    await this.addNewProjectButton.click();
  }

  async enterProjectName(name) {
    await this.NameInputField.fill(name);
  }

  async enterClientName(clientName) {
    await this.clientInputField.fill(clientName);
  }

  async enterProjectStage(stage) {
    await this.stageInputField.selectOption(stage);
  }

  async enterProjectDescription(desc) {
    await this.descInputfield.fill(desc);
    await this.clientDropdownField.click();
  }

  async enterProjectNotes(notes) {
    await this.notesInputfield.fill(notes);
  }

  async clickOkButton() {
    await this.okButton.isVisible();
    await this.okButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.isVisible();
    await this.cancelButton.click();
  }

  async clickActionIconButton() {
    await this.actionIconButton.click();
  }

  async clickSortByCreatedDate() {
    await this.sortByCreatedDate.click();
    await this.sortByCreatedDate.click();
  }

  async clickEditProjectButton() {
    await this.editProject.isVisible();
    await this.editProject.click();
  }

  async clickDeleteProjectButton() {
    await this.deleteProject.isVisible();
    await this.deleteProject.click();
  }

};