import json
import subprocess
import re
def back_link_data(num):
    if num == 1:
        save_data = []
        with open("backLink.txt", "w") as text_file:
            print([], file=text_file)
    else:
        OLDDATA = open("backLink.txt", "r")
        save_data = eval(OLDDATA.read())
        OLDDATA.close()
    DATA = open("tempSave.json", "r")
    data = DATA.read()
    DATA.close()
    results = re.findall(r"\"link\"\:\s\"[a-zA-Z0-9\:\.\-\_\+\%\/\\\?\=\&\)\(]*\"", data)
    count = 0
    for res in results:
        # Pulls out backlinks
        res = res.replace('link":', "")
        res = res.replace("\"", "")
        res = res.replace(" ", "")
        real = re.findall(r"\w*\W{3}[a-zA-Z0-9\.\-]*", res)
        res = real[0].replace("http://", "")
        res = res.replace("https://", "")
        res = res.replace("www.", "")
        results[count] = res
        save_data.append(res)
        count += 1
    # Saves backlinks to file
    with open("backLink.txt", "w") as text_file:
        print(save_data, file=text_file)
