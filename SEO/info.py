import json
import subprocess

DATA = open("tempSave.txt", "r")
print(DATA)
results = DATA.items
final_results = []
for res in results:
    link = res.link
    final_results.append(link)
print(final_results)
