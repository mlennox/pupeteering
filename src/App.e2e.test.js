import { errorMessages } from './formValidation'
import loginFormPage from './loginFormPage';

describe('App tests with expect-puppeteer', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  beforeEach(async () => {
    // click the 'show login form button'
    await page.click('#showLogin');
  });

  afterEach(async () => {
    await page.goto('http://localhost:3000');
  });

  describe('validation', () => {
    test('not adding an email address causes a "required" error message', async () => {
      await expect(page).toClick(loginFormPage.emailInput);
      await expect(page).toClick(loginFormPage.passwordInput);

      await expect(page).toMatch(errorMessages.email.required);
    });

    test('not providing a passsword causes a "required" error message', async () => {
      await expect(page).toClick(loginFormPage.passwordInput);
      await expect(page).toClick(loginFormPage.emailInput);

      await expect(page).toMatch(errorMessages.password.required);
    });

    test('bad email address generates an error message', async () => {
      await expect(page).toFillForm('form', {
        email: 'badEmailAddress',
        password: 'openSesame'
      });

      await expect(page).toMatch(errorMessages.email.invalid);
    });

    test('proper email address will pass validation', async () => {
      await expect(page).toFillForm('form', loginFormPage.goodInputData);

      await expect(page).not.toMatch(errorMessages.email.invalid);
    });
  });

  describe('interaction', () => {
    test('submit will pop dialog', async () => {
      await expect(page).toFillForm('form', loginFormPage.goodInputData);

      const dialog = await expect(page).toDisplayDialog(async () => {
        await expect(page).toClick(loginFormPage.submitButton);
      });

      await expect(JSON.parse(dialog.message())).toEqual(loginFormPage.goodInputData)
      dialog.dismiss();
    });
  });

});


