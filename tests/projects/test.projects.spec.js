const { test, expect } = require('../../utils/fixtures');

test.beforeEach(async ({ loginPage, projectsPage, page }) => {
    // login
    await loginPage.goTo();
    await loginPage.enterLoginDetails(process.env.EMAIL, process.env.PASSWORD);
    await loginPage.clickLoginButton();
    await expect(page).toHaveURL('https://app-evaluation-6k3s8p.azurewebsites.net/');
    await expect(page.locator('h1')).toContainText('Khyati Patel');

    // navigate to project tab
    await projectsPage.goToProjectsUrl();
    await projectsPage.verifyProjectPageHeader();
})

test.describe('Test "Add Projects" functionality', () => {
    const clientName = 'Abernathy Group';
    const projectName = 'test-project-name-khyati';

    test('Verify creating new project is successful', async ({ projectsPage, page }) => {
        await projectsPage.clickNewProjectButton();
        await expect(page.locator('header > p')).toContainText('Add Project');
        await projectsPage.enterProjectName(projectName);
        await projectsPage.enterClientName(clientName);
        await projectsPage.enterProjectStage('New');
        await projectsPage.enterProjectDescription('New project - description test');
        await projectsPage.enterProjectNotes('New project - Notes test');
        await projectsPage.clickOkButton();

        // assert new project is found in the list
        const row = page.locator('tr:has-text("test-project-name-khyati")');
        await expect(row).toContainText(projectName);
    });

    test('Verify empty fields in new project creation', async ({ projectsPage, page }) => {
        await projectsPage.clickNewProjectButton();
        await expect(page.locator('header > p')).toContainText('Add Project');
        await projectsPage.enterProjectName('');
        await projectsPage.clickOkButton();

        // assert error message on empty fields
        await expect(page.locator('ul > li')).toContainText([`The Name field is required.`]);
    });

    test('Verify error on empty client fields on new project creation', async ({ projectsPage, page }) => {
        await projectsPage.clickNewProjectButton();
        await expect(page.locator('header > p')).toContainText('Add Project');
        await projectsPage.enterProjectName(projectName);
        await projectsPage.clickOkButton();

        // assert error message on empty fields
        await expect(page.locator('ul > li')).toContainText([`FOREIGN KEY constraint "FK_Projects_Clients_ClientId" has been violated.`]);
    });
})

test.describe('Test "Edit Projects" functionality', () => {
    const projectName = 'test-project-name-khyati';
    const newProjectName = 'test-project-name-khyati-2';

    test('Verify editing new project is successful', async ({ projectsPage, page }) => {
        await projectsPage.clickSortByCreatedDate();
        await projectsPage.clickActionIconButton();
        await projectsPage.clickEditProjectButton();
        await projectsPage.enterProjectName(newProjectName);
        await projectsPage.clickOkButton();

        // assert new project is found in the list
        const row = page.locator('tr:has-text("test-project-name-khyati-2")');
        await expect(row).toContainText('test-project-name-khyati-2');
    });

    test('Verify cancel on edit', async ({ projectsPage, page }) => {
        await projectsPage.clickSortByCreatedDate();
        await projectsPage.clickActionIconButton();
        await projectsPage.clickEditProjectButton();
        await projectsPage.clickCancelButton();;
    });

})

test.describe('Test "Delete Project" functionality', () => {
    const newProjectName = 'test-project-name-khyati-2';

    test('Verify delete new project is successful', async ({ projectsPage, page }) => {
        await projectsPage.clickSortByCreatedDate();
        await projectsPage.clickActionIconButton();
        await projectsPage.clickDeleteProjectButton();
        await projectsPage.clickOkButton();
    });

})