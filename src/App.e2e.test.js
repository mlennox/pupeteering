import puppeteer from 'puppeteer';
import { errorMessages } from './formValidation'
import { dialogChecker } from './dialogChecker'

describe('App tests', () => {

  let page = null;
  let browser = null;

  beforeAll(async () => {
    try {
      browser = await
        puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true }).then(async browser => {
          console.log('browser load success');
          return browser;
        }).catch(err => { console.log('browser load failed', err); throw new Error(err); });
    }
    catch (err) {
      console.log('browser launch failed', err);
    }
    page = await browser.newPage().then(page => {
      console.log('new page success');
      return page;
    });
    await page.goto('http://localhost:3000').then(() => {
      console.log('page goto success');
    });

  });

  afterAll(() => {
    browser.close();
  })

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


