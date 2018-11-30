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

    describe.skip('without expect-puppeteer', () => {

      beforeAll(async () => {
        page.on('dialog', async dialog => {
          const message = await JSON.parse(dialog.message());
          await dialog.accept();
          dialogChecker.updateMessage(message);
        });
      })

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
        await page.type(emailInput, "bademailaddress");
        await page.click(passwordInput);

        const expected_errormessage = await page.$eval(email_errormessage, el => el.innerText);

        expect(expected_errormessage).toEqual(errorMessages.email.invalid);
      });

      test('proper email addresss will pass validation', async () => {
        await page.waitForSelector(emailInput);
        await page.type(emailInput, goodInputData.email);
        await page.click(passwordInput);

        const expected_errormessage = await page.$(email_errormessage);

        expect(expected_errormessage).toBeNull();
      });

      test('submit will pop dialog', async () => {
        await page.waitForSelector(emailInput);
        await page.type(emailInput, goodInputData.email);
        await page.type(passwordInput, goodInputData.password);

        await page.click(submitButton);
        const message = await dialogChecker.check();
        expect(message).toEqual(goodInputData);
      });


    });

  });

})


