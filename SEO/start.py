import requests
import json
from bs4 import BeautifulSoup
import subprocess
import sys

try:
    search_term = sys.argv[1]
except IndexError:
    search_term = "www.hailejewelryandloans.com"

GoldStar = ""
Final_Boss = "https://www.googleapis.com/customsearch/v1?key=" + GoldStar + "&cx=007760259646969936669:rsckdnnm2hy&q=" + search_term
response = requests.get(Final_Boss)
res = response.text.encode()
info = res
print(info)





# Save File to Compile Text
try:
    with open("tempSave.txt", "w", encoding="UTF-8") as text_file:
        print(res, file=text_file)
except UnicodeEncodeError:
    print("Encoding Issue\n Report to Developer")
