const { Builder, By, Key, until, log, WebElementCondition, Wait } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  const options = new chrome.Options();
  options.addArguments('start-maximized');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:5173/');
    const textBox = await driver.findElement(By.xpath('/html/body/div[2]/div[1]/div[2]/div'));
    const inputField = await textBox.findElement(By.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/input[1]'));
    await inputField.sendKeys('secret add bag cluster deposit beach illness letter crouch position rain arctic', Key.RETURN);
    const activateButton = await driver.wait(until.elementToBeClickable(By.xpath('/html[1]/body[1]/div[2]/div[1]/div[2]/div[1]/div[3]/button[2]')));
    await activateButton.click();

  } finally {
    await driver.quit();
  }
})();

