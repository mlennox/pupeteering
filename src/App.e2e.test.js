import { errorMessages } from './formValidation'
import loginFormPage from './loginFormPage';

describe.only('App tests with expect-puppeteer', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');

    await page.setRequestInterception(true);

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
      await expect(page).toFillForm('form', {
        email: '',
      });
      await expect(page).toClick(loginFormPage.submitButton);
      await expect(page).toMatch(errorMessages.email.required);


      // await expect(page).toClick(loginFormPage.emailInput);
      // await expect(page).toClick(loginFormPage.passwordInput);
    });

    test('not providing a passsword causes a "required" error message', async () => {
      // await expect(page).toClick(loginFormPage.passwordInput);
      // await expect(page).toClick(loginFormPage.emailInput);
      await expect(page).toFillForm('form', {
        email: loginFormPage.goodInputData.email,
        password: '',
      });

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

  describe('submission', () => {
    beforeAll(async () => {
      await page.on('request', request => {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ loggedIn: true }),
          useFinalURL: false
        });
      });
    });

    test('submitting form with correct details will succeed', async () => {
      await expect(page).toFillForm('form', loginFormPage.goodInputData);

      const dialog = await expect(page).toDisplayDialog(async () => {
        await expect(page).toClick(loginFormPage.submitButton);
      });

      await dialog.accept();

      await expect(page).toMatch('You logged in successfully');
    });
  });

});


