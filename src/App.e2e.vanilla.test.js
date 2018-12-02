import { errorMessages } from './formValidation'
import { dialogChecker } from './dialogChecker'

import loginFormPage from './loginFormPage';

describe('App tests without expect-puppeteer', () => {

  beforeAll(async () => {
    await page.goto('http://localhost:3000');

    page.on('dialog', async dialog => {
      const message = await JSON.parse(dialog.message());
      await dialog.accept();
      dialogChecker.updateMessage(message);
    });
  });


  beforeEach(async () => {
    // click the 'show login form button'
    await page.click('#showLogin');
  });

  afterEach(async () => {
    await page.goto('http://localhost:3000');
  })

  describe('validation', () => {

    test('not adding an email address causes a "required" error message', async () => {
      await page.waitForSelector(loginFormPage.emailInput);
      await page.click(loginFormPage.emailInput);
      await page.click(loginFormPage.passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$eval(loginFormPage.email_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual(errorMessages.email.required);
    });

    test('not providing a passsword causes a "required" error message', async () => {
      await page.waitForSelector(loginFormPage.passwordInput);
      await page.click(loginFormPage.passwordInput);
      await page.click(loginFormPage.emailInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$eval(loginFormPage.password_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual(errorMessages.password.required);
    });

    test('bad email address generates an error message', async () => {
      await page.waitForSelector(loginFormPage.emailInput);
      await page.type(loginFormPage.emailInput, "bademailaddress");
      await page.click(loginFormPage.passwordInput);

      const expected_errormessage = await page.$eval(loginFormPage.email_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual(errorMessages.email.invalid);
    });

    test('proper email addresss will pass validation', async () => {
      await page.waitForSelector(loginFormPage.emailInput);
      await page.type(loginFormPage.emailInput, loginFormPage.goodInputData.email);
      await page.click(loginFormPage.passwordInput);

      const expected_errormessage = await page.$(loginFormPage.email_errormessage);


      expect(expected_errormessage).toBeNull();
    });


  });

  describe('interaction', () => {
    test('submit will pop dialog', async () => {
      await page.waitForSelector(loginFormPage.emailInput);
      await page.type(loginFormPage.emailInput, loginFormPage.goodInputData.email);
      await page.type(loginFormPage.passwordInput, loginFormPage.goodInputData.password);

      await page.click(loginFormPage.submitButton);
      const message = await dialogChecker.check();
      expect(message).toEqual(loginFormPage.goodInputData);
    });
  });
})


