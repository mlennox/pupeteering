import puppeteer from 'puppeteer';

let page, browser = null;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
})

describe('App tests', () => {

  describe('validation', () => {

    const emailInput = '[data-testid="email"]';
    const email_errormessage = '[data-testid="email_label"] .error';
    const passwordInput = '[data-testid="password"]';
    const password_errormessage = '[data-testid="password_label"] .error';

    beforeAll(async () => {
      await page.goto('http://localhost:3000/')
    })

    test('not adding an email address causes a "required" error message', async () => {
      await page.click(emailInput);
      await page.click(passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.waitFor(email_errormessage);

      expect(expected_errormessage).not.toEqual('Required');
    });

    test('bad email address generates an error message', async () => {
      await page.click(emailInput);
      await page.type(emailInput, "bademailaddress");
      await page.click(passwordInput); // no blur, so click elsewhere instead

      const expected_errormessage = await page.waitFor(email_errormessage);

      expect(expected_errormessage).not.toEqual('Invalid email address');
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


