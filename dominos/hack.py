
from selenium.webdriver.common.keys import Keys
import time
from datetime import date
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from lxml import html
import requests

# page = requests.get('http://econpy.pythonanywhere.com/ex/001.html')
# tree = html.fromstring(page.content)

PATH = "C:\Program Files (x86)\chromedriver.exe"

driver = webdriver.Chrome(PATH)


driver.get("https://commande.dominos.fr/store-search")

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "onetrust-reject-all-handler"))
    )
    element.send_keys(Keys.RETURN)

finally:
    print("COOKIE")







try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "input"))
    )
    element.send_keys('Lyon 1')

finally:
    print("SAISIR UNE ADRESSE")




try:
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id='app']/div/div/div/div/div/div/div/div/div/section/section[2]/div/div/div[1]/select/option[2]" ))
    )
    element.click()


finally:
    print("SAISIR LYON 1 / Lyon 2")





today = date.today()

try:
    time.sleep(3)
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/div/div/section/section/div/div/div[1]/select/option[2]" ))
    )
    element.click()


finally:
    print("SAISIR DATE")



try:
    time.sleep(3)
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/div/div/section/section/div/div/div[2]/select/option[22]" ))
    )
    element.click()


finally:
    print("SAISIR HEURE")




try:
    time.sleep(0.6)
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div/div/div/div/div/div/section/section/div/div/div[3]/button" ))
    )
    element.click()


finally:
    print("CONFIRMER DATE & HEURE")



for i in range (10000) :


    time.sleep(0.6)
    # write the code
    code = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id='app']/div/div/div/div/div/div/div/div/div[2]/div/div/div/section[1]/div/div/div/div/div/input" ))
    )
    code.send_keys(i)


    # Validate the code
    element = WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//*[@id='app']/div/div/div/div/div/div/div/div/div[2]/div/div/div/section[1]/div/div/div/div/button" ))
    )
    element.click()

    # Get the response
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "_2dORYHrPZNzf4bbS-zB8TU"))
    )
    response = element.text
    print(response)
    code.clear()






