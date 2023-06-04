from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.alert import Alert
import time

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')


# def get_price():

#     driver = webdriver.Chrome("/usr/local/bin/chromedriver", options=chrome_options)

#     da = Alert(driver)

#     # 배출권시장 정보플랫폼을 selenium으로 접속
#     driver.get("https://ets.krx.co.kr/contents/ETS/03/03010000/ETS03010000.jsp")
#     driver.implicitly_wait(3)
#     da.accept()
 
#     da.dismiss()
#     # table에서 현재가 열을 불러와서 KAU22의 값을 출력
#     ele = driver.find_elements("name", 'tdd_clsprc')[1]
#     driver.quit()
#     return int(ele.text.replace(','))


driver = webdriver.Chrome("./chromedriver")
driver.get("https://ets.krx.co.kr/contents/ETS/03/03010000/ETS03010000.jsp")

try:
    while True:
        # 매번 새로고침 후 로딩까지 대기
        driver.refresh()
        time.sleep(5)

        # 배출권시장 정보플랫폼을 selenium으로 접속
        
        driver.implicitly_wait(3)

        # table에서 현재가 열을 불러와서 KAU22의 값을 출력
        ele = driver.find_element("xpath", '/html/body/div[2]/div/article/div/div[3]/dl/dd[2]/div/div[1]/div[1]/div[2]/div/div/table/tbody/tr[1]/td[3]')

        # table에서 현재가 열을 불러와서 KAU22의 값을 출력
        f = open('price.txt', 'w')
        print(ele.text)
        f.write(ele.text.replace(',', ''))
        f.close()
        time.sleep(60)
except Exception as e:
    print(e)
    driver.quit()
finally:
    driver.quit()

'''461 = 6/28, 639 = 1/1 
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