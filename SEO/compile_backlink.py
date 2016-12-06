from back_link_data import back_link_data
import subprocess
import re
import time

def compile_backlink(name, max_count):
    DATA = open("backLink.txt", "r")
    datas = eval(DATA.read())
    DATA.close()
    data_to_return = [];
    date = time.time()
    print(len(datas))
    for data in datas:
        print(data)
        item_count = 0
        x = 0
        for info in datas:
            if data in info:
                item_count += 1
                del datas[x]
            x+=1
        total_percent = item_count / max_count
        save = {"url": data, "count": item_count, "term": name, "time": date, "max_count": max_count, "total_percent": total_percent}
        data_to_return.append(save)
        # print(save)
    with open("link_count.txt", "w") as text_file:
        print(data_to_return, file=text_file)
compile_backlink("name", 260)
