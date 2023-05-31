from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

def get_price():

    driver = webdriver.Chrome("/usr/local/bin/chromedriver", chrome_options=chrome_options)

    # 배출권시장 정보플랫폼을 selenium으로 접속
    driver.get("https://ets.krx.co.kr/contents/ETS/03/03010000/ETS03010000.jsp")
    driver.implicitly_wait(3)

    # table에서 현재가 열을 불러와서 KAU22의 값을 출력
    ele = driver.find_elements("name", 'tdd_clsprc')[1]
    driver.quit()
    return int(ele.text.replace(','))

# while True:
#     # 매번 새로고침 후 로딩까지 대기
#     driver.refresh()
#     time.sleep(5)

#     # table에서 현재가 열을 불러와서 KAU22의 값을 출력
#     ele = driver.find_elements("name", 'tdd_clsprc')[1]
#     print(ele.text)
#     time.sleep(60)

'''
find_elements("name", 'tdd_clsprc')의 elements 순서

header
KAU22
KAU23
KAU24
KAU25
KCU22
KCU23
KOC21-23
KOC22-24
KOC23-25
i-KCU22
i-KCU23
i-KOC21-23
i-KOC22-24
i-KOC23-25
'''