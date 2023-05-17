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
        By.XPATH, '//input[@placeholder="Please insert your mnemonic"]')
    loginButton = (By.XPATH, '//button[contains(., "Login")]')
    closeButton = (By.XPATH, '//button[contains(., "Close")]')
    mnemonics_field = (By.XPATH, '//div[@class="Mnemonics"]')
    logoutButton = (By.XPATH, '//button[contains(., "Logout")]')
    create_new_account_button = (
        By.XPATH, ("//button[contains(., \"Don't have account? Create One \")]"))
    ssh_key_field = (By.XPATH, '//textarea[@placeholder="Public SSH Key"]')
    update_ssh_key_button = (
        By.XPATH, '//button[contains(., "Update Public SSH Key")]')

    def __init__(self, browser):
        self.browser = browser

    def add_mnemonics(self, mnemonics):
        self.browser.find_element(*self.inputField).send_keys(mnemonics)

    def login(self):
        WebDriverWait(self.browser, 20).until(
            EC.element_to_be_clickable(self.loginButton))
        self.browser.find_element(*self.loginButton).click()

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

    def add_ssh_key(self, ssh_key):
        WebDriverWait(self.browser, 50).until(
            EC.presence_of_element_located(self.ssh_key_field))
        # self.browser.find_element(*self.ssh_key_field).send_keys(ssh_key)

    def update_ssh_key(self):
        WebDriverWait(self.browser, 40).until(
            EC.element_to_be_clickable(self.update_ssh_key_button))
        self.browser.find_element(*self.update_ssh_key_button).click()
