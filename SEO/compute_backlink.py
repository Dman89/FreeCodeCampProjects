import subprocess
import re
import time

def compute_backlink(name):
    DATA = open("link_count.txt", "r")
    datas = eval(DATA.read())
    DATA.close()
    data_to_return = [];
    z=0
    while (z < len(datas)):
        x=0
        y=1
        while (y < len(datas)):
            if datas[x]['count'] > datas[y]['count']:
                temp = datas[x]
                del datas[x]
                datas.insert(y, temp)
            y+=1
            x+=1
        z+=1
    datas.reverse()
    with open(str(name)+".txt", "w") as text_file:
        print(datas, file=text_file)
    with open(str(name)+".json", "w") as text_file:
        print(datas, file=text_file)
# compute_backlink("www.hailejewelryandloans.com")
