import puppeteer from 'puppeteer';

let page, browser = null;

beforeAll(async () => {
  try {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  }
  catch (e) {
    console.log('= = = = = = = BEFORE ALL ERROR', e);
    if (browser) await browser.close();
    if (page) await page.close();
  }
});

// afterAll(async () => {
//   try {
//     if (browser) await browser.close();
//     if (page) await page.close();
//   }
//   catch (e) {
//     console.log('= = = = = = = AFTER ALL ERROR', e);
//   }
// })

describe('App tests', () => {

  describe('validation', () => {

    const emailInput = '[data-testid="email"]';
    const email_errormessage = '[data-testid="email_label"] .error';
    const passwordInput = '[data-testid="password"]';
    const password_errormessage = '[data-testid="password_label"] .error';

    beforeAll(async () => {
      await page.goto('http://localhost:3000/')
    })

    afterAll(async () => {
      browser.close();
    })

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


