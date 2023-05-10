from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

"""
This module contains Profile Manager page elements.
"""


class ProfileManager:
    inputField = (
        By.XPATH, '//input[@placeholder="Please insert your mnemonics"]')
    activateButton = (By.XPATH, '//button[contains(., "Activate")]')
    closeButton = (By.XPATH, '//button[contains(., "Close")]')
    mnemonics = (By.XPATH, '//input[contains(@value, "Mnemonics")]')

    def __init__(self, browser):
        self.browser = browser

    def add_mnemonics(self, mnemonics):
        self.browser.find_element(*self.inputField).send_keys(mnemonics)

    def activate_mnemonic(self):
        WebDriverWait(self.browser, 20).until(
            EC.element_to_be_clickable(self.activateButton))
        self.browser.find_element(*self.activateButton).click()

    def get_mnemonics(self):
        WebDriverWait(self.browser, 20).until(
            EC.visibility_of_element_located(self.mnemonics))
        return self.mnemonics.get_attribute("value")

    def close_profile(self):
        self.browser.find_element(*self.closeButton).click()
