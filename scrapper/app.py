from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from openpyxl import Workbook
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException
from selenium.webdriver.chrome.service import Service
from time import sleep

LINK = "https://www.zennioptical.com/b/prescription-sunglasses?page=2"

data = []


def bot(link):
    galleryImages = []
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    ignored_exceptions = (NoSuchElementException,
                          StaleElementReferenceException)
    driver.get(link)
    wait = WebDriverWait(driver, 10)

    wait.until(EC.presence_of_element_located(
        (By.ID, "comp-pdp-name-section")))

    name = driver.find_element(By.CLASS_NAME, "productName")
    price = driver.find_element(By.CLASS_NAME, "price")

    image = driver.find_element(
        By.CLASS_NAME, "slick-active").find_element(By.TAG_NAME, "img")

    imagesEl = driver.find_element(
        By.CLASS_NAME, "slick-dots").find_elements(By.TAG_NAME, 'img')

    for img in imagesEl:
        src = img.get_attribute("src")
        galleryImages.append(src)

    tst = driver.find_element(
        By.ID, "comp-pdp-nav-tabs").find_elements(By.TAG_NAME, "li")[1].find_element(By.TAG_NAME, "a").click()

    dsc = driver.find_element(
        By.ID, "description").find_element(By.TAG_NAME, "p").text

    print(name.text)
    print("fetched \n\n")

    obj = {
        "name": name.text,
        "imageURI": image.get_attribute("src"),
        "galleryImages": galleryImages,
        "price": price.text,
        "short_description": dsc,

    }

    data.append(obj)

    sleep(1)
    driver.quit()


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
ignored_exceptions = (NoSuchElementException, StaleElementReferenceException)
driver.get(LINK)

wait = WebDriverWait(driver, 10)
sleep(1)

wait.until(EC.presence_of_element_located((By.ID, "main-section")))
# courses_container = driver.find_element(By.CLASS_NAME, "category-best-selling noprice")

products = driver.find_elements(By.CLASS_NAME, "card-cover")

links = []

for product in products:
    link = product.find_element(By.TAG_NAME, 'a').get_attribute("href")
    links.append(link)

for item in links:
    print("redirecting to: ", item)
    bot(item)


print(len(products))


print("title: " + driver.title)
print(data)
driver.quit()
