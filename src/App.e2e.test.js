import puppeteer from 'puppeteer';

const bigTimeout = 5000;
jest.setTimeout(bigTimeout);

describe('App tests', () => {

  let page = null;
  let browser = null;

  beforeAll(async () => {
    try {
      browser = await
        // puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {
        puppeteer.launch().then(async browser => {
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
    await page.goto('http://localhost:3000', { timeout: bigTimeout }).then(() => {
      console.log('page goto success');
    });
  });

  afterAll(() => {
    browser.close();
  })

  describe('validation', () => {

    const emailInput = '[data-testid="email"]';
    const email_errormessage = '[data-testid="email_label"] .error';
    const passwordInput = '[data-testid="password"]';
    const password_errormessage = '[data-testid="password_label"] .error';

    test('not adding an email address causes a "required" error message', async () => {
      await page.click(emailInput);
      await page.click(passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$eval(email_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual('Required');
    });

    test('not providing a passsword causes a "required" error message', async () => {
      await page.click(passwordInput);
      await page.click(emailInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$eval(password_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual('Required');
    });

    test('bad email address generates an error message', async () => {
      await page.click(emailInput);
      await page.type(emailInput, "bademailaddress");
      await page.click(passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$eval(email_errormessage, el => el.innerText);

      expect(expected_errormessage).toEqual('Invalid email address');
    });

    test('proper email addresss will pass validation', async () => {
      await page.click(emailInput);
      await page.type(emailInput, "good@email.com");
      await page.click(passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.$(email_errormessage);

      expect(expected_errormessage).toBeNull();
    })
  });

})


