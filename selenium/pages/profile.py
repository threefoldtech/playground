from asyncio import sleep
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
    mnemonics_field = (By.XPATH, '//div[@class="Mnemonics"]')
    logoutButton = (By.XPATH, '//button[contains(., "Logout")]')
    create_new_account_button = (By.XPATH, ("//*[contains(text(), \"Don't have an account? Create One\")]"))
                                 
    def __init__(self, browser):
        self.browser=browser

    def add_mnemonics(self, mnemonics):
        self.browser.find_element(*self.inputField).send_keys(mnemonics)

    def activate_mnemonic(self):
        WebDriverWait(self.browser, 20).until(
            EC.element_to_be_clickable(self.activateButton))
        self.browser.find_element(*self.activateButton).click()

    def close_profile(self):
        self.browser.find_element(*self.closeButton).click()

    def get_mnemonics(self):
        WebDriverWait(self.browser, 20).until(
            EC.presence_of_element_located(self.mnemonics_field))
        return self.inputField.find_element(*self.mnemonics_field).get_attribute("value")
    
    def logout(self):
        WebDriverWait(self.browser, 20).until(
            EC.element_to_be_clickable(self.logoutButton))
        self.browser.find_element(*self.logoutButton).click()

    def create_new_account(self):
        WebDriverWait(self.browser, 20).until(
            EC.element_to_be_clickable(self.create_new_account_button))
        self.browser.find_element(*self.create_new_account_button).click()