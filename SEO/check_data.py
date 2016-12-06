import subprocess
import re
import time

def check_data(name):
    DATA = open(name+".txt", "r")
    datas = eval(DATA.read())
    DATA.close()
    total=0
    total2=0
    for data in datas:
        total += data["total_percent"]
        total2 += data["count"]
        print(data["url"], ": For a Total Of ", data["count"])
    print(total, total2)
check_data("www.hailejewelryandloans.com")
