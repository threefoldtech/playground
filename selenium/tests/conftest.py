from sys import displayhook
import pytest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from pyvirtualdisplay import Display


"""
This module contains shared browser fixtures.
"""


@pytest.fixture
def browser():

    driver = webdriver.Chrome()
    driver.get('http://localhost:5173/')

    yield driver

