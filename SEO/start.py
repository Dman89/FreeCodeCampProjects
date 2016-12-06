import requests
import json
from bs4 import BeautifulSoup
import subprocess
import sys
import re
from back_link_data import back_link_data
from compile_backlink import compile_backlink
from compute_backlink import compute_backlink
from check_data import check_data
try:
    search_term = sys.argv[1]
except IndexError:
    search_term = "www.hailejewelryandloans.com"
index = 1
total_queries = 0
resposne = ""
res = ""
data = ""

def save(data, index):
    # Save File to Compile Text
    try:
        with open("tempSave.json", "w", encoding="UTF-8") as text_file:
            print(data, file=text_file)
        try:
            with open("tempSave"+str(index)+".txt", "w", encoding="UTF-8") as text_file:
                print(data, file=text_file)
        except TypeError:
            print("\n\n\n","Didnt Save Indexed Filename", "\n\n\n\n")
    except UnicodeEncodeError:
        print("Encoding Issue\n Report to Developer")

def AJAX(GoldStar, search_term, index):
    Final_Boss = "https://www.googleapis.com/customsearch/v1?key=" + GoldStar + "&cx=007760259646969936669:rsckdnnm2hy&q=" + search_term +"&start="+ str(index)
    response = requests.get(Final_Boss)
    if response.status_code == 200:
        global total_queries
        global data
        res = response.text
        info = res.replace("\n", "")
        data = info.encode("UTF-8")
        save(data, index)
        if total_queries == 0:
            total_queries2 = re.findall(r"\"totalResults\"\:\s\"\d*\"", res)
            total_queries2 = re.findall(r"[0-9]+", total_queries2[0])
            total_queries2 = int(total_queries2[0])
            if total_queries2 % 10 == 0:
                total_queries2 = total_queries2 / 10
            else:
                total_queries2 = ((total_queries2 - (total_queries2 % 10)) / 10) + 1
            if total_queries < total_queries2:
                total_queries = total_queries2
    else:
        print( "\n\n", response.status_code, "\n\n", response.content, "\n\n")
print("\n\n", index, "\n\n")
AJAX(GoldStar, search_term, index)
back_link_data(index)
index += 1

if total_queries > 1:
    while (index <= total_queries):
        print("\n\n", index, "out of", total_queries, "\n\n", "\n\n", )
        AJAX(GoldStar, search_term, index)
        back_link_data(index)
        index += 1

max_count = total_queries * 10
compile_backlink(search_term, max_count)
compute_backlink(search_term)
check_data(search_term)
