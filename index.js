require('dotenv').config();
const puppeteer = require('puppeteer');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomRadioValue = () => Math.floor(Math.random() * 5) + 1;

async function automateDashboard() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const radioValue = process.env.RADIO_VALUE ? parseInt(process.env.RADIO_VALUE) : null;

  try {
    await page.goto('https://academia.pnj.ac.id/', { waitUntil: 'networkidle2' });

    await page.type('.intro-x.login__input.form-control.py-3.px-4.block', process.env.NIM, { delay: 100 });
    await page.type('.intro-x.login__input.form-control.py-3.px-4.block.mt-4', process.env.PASSWORD, { delay: 100 });

    await page.click('.btn.btn-primary.py-3.px-4.w-full.xl\\:w-32.xl\\:mr-3.align-top');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await page.goto('https://academia.pnj.ac.id/dashboard/perkuliahan/isian-kuisioner-edom', { waitUntil: 'networkidle2' });

    await page.click('.items.ts-input.full.has-items');
    await page.waitForSelector('.option[data-value="20241"]', { visible: true });
    await page.click('.option[data-value="20241"]');
    await wait(1000);

    const rows = await page.$$('tr');
    for (let row of rows) {
      const statusText = await row.$eval('b', el => el.textContent).catch(() => null);
      if (statusText === 'Belum Terisi') {
        const viewButton = await row.$('.btn-primary');
        if (viewButton) {
          await viewButton.click();
          await wait(1000);

          await page.evaluate((radioValue) => {
            const radioButtons = document.querySelectorAll('input[type="radio"][value]');
            radioButtons.forEach(radio => {
              const value = radioValue !== null ? radioValue : getRandomRadioValue();
              radio.value = value;
              radio.checked = true;

              const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
              const changeEvent = new Event('change', { bubbles: true });

              radio.dispatchEvent(clickEvent);
              radio.dispatchEvent(changeEvent);
              radio.removeAttribute('disabled');
              radio.dataset.answered = 'true';
            });
          }, radioValue);

          await page.waitForSelector('button[type="button"].btn.btn-primary', { visible: true });
          await page.click('button[type="button"].btn.btn-primary');
          await wait(1000);
          
          await page.waitForSelector('.swal2-confirm.swal2-styled', { visible: true });
          await page.click('.swal2-confirm.swal2-styled');
          await wait(1000);
          
          await page.waitForSelector('a.btn.btn-light.shadow-md', { visible: true });
          await page.click('a.btn.btn-light.shadow-md');
          await wait(1000);
        }
      }
    }

    console.log('Automation completed successfully!');
  } catch (error) {
    console.error('Error automating the dashboard:', error);
  } finally {
    await browser.close();
  }
}

automateDashboard();
