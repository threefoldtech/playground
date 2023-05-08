import { Builder, Capabilities, By } from 'selenium-webdriver';

const capabilities = Capabilities.chrome();
const driver = new Builder().withCapabilities(capabilities).build();

async function example() {
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Hello, world!');
    await driver.findElement(By.name('btnK')).click();
}

example();
