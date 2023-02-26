from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from openpyxl import Workbook
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException
from selenium.webdriver.chrome.service import Service
from time import sleep

LINK = "https://www.adidas.com/us/men-athletic_sneakers"
data = []
links = []


def bot(link):
    print("fetching: ", link)
    galleryImages = []
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    ignored_exceptions = (NoSuchElementException,
                          StaleElementReferenceException)
    driver.get(link)
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located(
        (By.ID, "main-content")))

    name = driver.find_element(By.CLASS_NAME, "name___120FN").text
    price = driver.find_element(By.CLASS_NAME, "gl-price-item").text
    imageURI = driver.find_element(
        By.TAG_NAME, "picture").find_element(By.TAG_NAME, 'img').get_attribute("src")

    images = driver.find_element(
        By.ID, "navigation-target-gallery").find_elements(By.TAG_NAME, "img")

    for im in images:
        galleryImages.append(im.get_attribute("src"))

    descrip = driver.find_element(
        By.ID, "navigation-target-description")

    descrip.find_element(By.TAG_NAME, "button").click()

    description = driver.find_element(
        By.CLASS_NAME, 'description___29WFI').find_element(By.TAG_NAME, "p").text

    obj = {
        "name": name,
        "imageURI": imageURI,
        "galleryImages": galleryImages,
        "price": price,
        "short_description": description,
    }

    data.append(obj)

    sleep(1)
    driver.quit()




driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
ignored_exceptions = (NoSuchElementException, StaleElementReferenceException)
driver.get(LINK)

wait = WebDriverWait(driver, 10)
sleep(1)

wait.until(EC.presence_of_element_located(
    (By.CLASS_NAME, "main-container___1Y0Q_")))

items = driver.find_elements(By.CLASS_NAME, "glass-product-card-container")

print(len(items))

for item in items:
    li = item.find_element(By.TAG_NAME, "a").get_attribute("href")
    links.append(li)

for link in links:
    bot(link)


print(data)
print(driver.title)
driver.quit()
