import puppeteer from 'puppeteer';





describe('App tests', () => {

  let browser = null;

  beforeAll(async () => {
    try {
      // /home/circleci/repo/node_modules/puppeteer/.local-chromium
      browser = await puppeteer.launch({ headless: true });
      // browser = await puppeteer.launch({ headless: true, executablePath: '/home/circleci/repo/node_modules/puppeteer/.local-chromium' });
    }
    catch (e) {
      console.log('= = = = = = = BEFORE ALL ERROR - BROWSER', e);
      if (browser) await browser.close();
    }
  });

  afterAll(async () => {
    browser.close();
  });


  describe('validation', () => {

    let page = null;

    const emailInput = '[data-testid="email"]';
    const email_errormessage = '[data-testid="email_label"] .error';
    const passwordInput = '[data-testid="password"]';
    const password_errormessage = '[data-testid="password_label"] .error';

    // beforeAll(async () => {
    //   await page.goto('http://localhost:3000/')
    // });




    beforeEach(async () => {
      page = await browser.newPage().then(() => { console.log('newpage success') }).catch((e) => console.log("new page failed", e));

      await page.goto('http://localhost:3000/', { timeout: 20000 }).then(() => { console.log('page goto success') }).catch((e) => console.log("page goto failed", e));

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


