import puppeteer from 'puppeteer';
import { errorMessages } from './formValidation'

describe('App tests', () => {

  let page = null;
  let browser = null;

  beforeAll(async () => {
    try {
      browser = await
        puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
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

    beforeEach(async () => {
      // click the 'show login form button'
      await page.click('#showLogin');
    });

    afterEach(async () => {
      await page.goto('http://localhost:3000').then(() => {
        // console.log('page goto success');
      });
    })

    describe('without expect-puppeteer', () => {

      const email_errormessage = '[data-testid="email_label"] .error';
      const password_errormessage = '[data-testid="password_label"] .error';

      test('not adding an email address causes a "required" error message', async () => {
        await page.waitForSelector(emailInput);
        await page.click(emailInput);
        await page.click(passwordInput); // no blur, so click elsewhere instead

        const expected_errormessage = await page.$eval(email_errormessage, el => el.innerText);

        expect(expected_errormessage).toEqual(errorMessages.email.required);
      });

      test('not providing a passsword causes a "required" error message', async () => {
        await page.waitForSelector(passwordInput);
        await page.click(passwordInput);
        await page.click(emailInput); // no blur, so click elsewhere instead

        const expected_errormessage = await page.$eval(password_errormessage, el => el.innerText);

        expect(expected_errormessage).toEqual(errorMessages.password.required);
      });

      test('bad email address generates an error message', async () => {
        await page.waitForSelector(emailInput);
        await page.click(emailInput);
        await page.type(emailInput, "bademailaddress");
        await page.click(passwordInput); // no blur, so click elsewhere instead

        const expected_errormessage = await page.$eval(email_errormessage, el => el.innerText);

        expect(expected_errormessage).toEqual(errorMessages.email.invalid);
      });

      test('proper email addresss will pass validation', async () => {
        await page.waitForSelector(emailInput);
        await page.click(emailInput);
        await page.type(emailInput, "good@email.com");
        await page.click(passwordInput); // no blur, so click elsewhere instead

        const expected_errormessage = await page.$(email_errormessage);

        expect(expected_errormessage).toBeNull();
      });
    });

    describe('with expect-puppeteer', () => {
      test('not adding an email address causes a "required" error message', async () => {
        await expect(page).toClick(emailInput);
        await expect(page).toClick(passwordInput);

        await expect(page).toMatch(errorMessages.email.required);
      });

      test('not providing a passsword causes a "required" error message', async () => {
        await page.click(passwordInput);
        await page.click(emailInput); // no blur, so click elsewhere instead

        await expect(page).toMatch(errorMessages.password.required);
      });

      test('bad email address generates an error message', async () => {
        await expect(page).toFillForm('form', {
          email: 'badEmailAddress',
        });

        await expect(page).toMatch(errorMessages.email.invalid);
      });

      test('proper email addresss will pass validation', async () => {
        await expect(page).toFillForm('form', {
          email: 'good@email.com',
        });

        await expect(page).not.toMatch(errorMessages.email.invalid);
      });
    });


  });

})


