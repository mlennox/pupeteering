import { errorMessages } from './formValidation'

describe('App tests', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  describe('validation', () => {
    const emailInput = '[data-testid="email"]';
    const passwordInput = '[data-testid="password"]';
    const submitButton = '[data-testid="submit"]';
    const goodInputData = {
      email: 'good@me.com',
      password: 'openSesame'
    };

    beforeEach(async () => {
      // click the 'show login form button'
      await page.click('#showLogin');
    });

    afterEach(async () => {
      await page.goto('http://localhost:3000');
    })

    describe('with expect-puppeteer', () => {
      test('not adding an email address causes a "required" error message', async () => {
        await expect(page).toClick(emailInput);
        await expect(page).toClick(passwordInput);

        await expect(page).toMatch(errorMessages.email.required);
      });

      test('not providing a passsword causes a "required" error message', async () => {
        await expect(page).toClick(passwordInput);
        await expect(page).toClick(emailInput);

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
        await expect(page).toFillForm('form', goodInputData);

        await expect(page).not.toMatch(errorMessages.email.invalid);
      });

      test('submit will pop dialog', async () => {
        await expect(page).toFillForm('form', goodInputData);

        const dialog = await expect(page).toDisplayDialog(async () => {
          await expect(page).toClick(submitButton);
        });

        await expect(JSON.parse(dialog.message())).toEqual(goodInputData)
        dialog.dismiss();
      });

    });


  });

})


