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

    // create new project
    const clientName = 'Abernathy Group';
    const projectName = 'test-project-name-khyati';
    await projectsPage.clickNewProjectButton();
    await expect(page.locator('header > p')).toContainText('Add Project');
    await projectsPage.enterProjectName(projectName);
    await projectsPage.enterClientName(clientName);
    await projectsPage.enterProjectStage('New');
    await projectsPage.enterProjectDescription('New project - description test');
    await projectsPage.enterProjectNotes('New project - Notes test');
    await projectsPage.clickOkButton();
    await projectsPage.clickSortByCreatedDate();

    // assert new project is found in the list
    const row = page.locator('td:has-text("test-project-name-khyati")').first();
    await expect(row).toContainText(projectName);
    await row.click();
})
test.afterEach(async ({ projectsPage }) => {
    await projectsPage.goToProjectsUrl();
    await projectsPage.clickSortByCreatedDate();
    await projectsPage.clickActionIconButton();
    await projectsPage.clickDeleteProjectButton();
    await projectsPage.clickOkButton();
})

test.describe('Test "Add Task" functionality', () => {
    const title = 'Test title by Khyati';

    test('Verify create new task is successful', async ({ taskPage, page }) => {
        await taskPage.clickAddNewTaskButton();
        await taskPage.enterTaskTitle(title);
        await page.locator('[placeholder="Title"]').press('Enter');

        // assert new task
        expect(page.locator('.board-item draggable > div > p').filter({ hasText: title }));
    });
})

test.describe('Test "Edit Task" functionality', () => {
    const title = 'Test title by Khyati';
    const newTitle = 'Test title by Khyati 2';
    const titleDesc = 'Test summary'

    test('Verify error on empty title on editing new task', async ({ taskPage, page }) => {
        await taskPage.clickAddNewTaskButton();
        await taskPage.enterTaskTitle(title);
        await page.locator('[placeholder="Title"]').press('Enter');
        await taskPage.clickOpenTask();
        await taskPage.enterTaskTitle('');
        await taskPage.clickOkButton();

        // assert error message
        await expect(page.locator('ul > li')).toContainText([`The Title field is required.`]);
    });

    test('Verify edit new task is successful', async ({ taskPage, page }) => {
        await taskPage.clickAddNewTaskButton();
        await taskPage.enterTaskTitle(title);
        await page.locator('[placeholder="Title"]').press('Enter');
        await taskPage.clickOpenTask();
        await taskPage.enterTaskTitle(newTitle);
        await taskPage.enterTaskDescription(titleDesc);
        await taskPage.clickOkButton();

        // assert new task
        await expect(page.getByTitle(newTitle)).toContainText(newTitle);
    });

})

test.describe('Test "Delete Task" functionality', () => {
    const newTitle = 'Test title by Khyati 2';

    test('Verify delete new project is successful', async ({ taskPage, page }) => {
        await taskPage.clickAddNewTaskButton();
        await taskPage.enterTaskTitle(newTitle);
        await page.locator('[placeholder="Title"]').press('Enter');
        await taskPage.clickDeleteTask();
        await taskPage.clickOkButton();
    });

})