# Running python start.py (<ENTER SQUARE FEET OF HOUSE IN QUESTION>) (<ENTER ARRAY OF PAST [SQUARE FEET, TOTAL PRICE]>)
# Running python start.py with neither of the two arguments well get you basic sample function / data
import sys
def price_per_square_feet(size, pastDataArr):
    return size * cost_per_square_feet(pastDataArr)
def cost_per_square_feet(datas):
    total_number = len(datas)
    sum_of_sq_ft = 0
    for data in datas:
        ans = (data[1]/data[0])
        sum_of_sq_ft += ans
    average = sum_of_sq_ft / total_number
    return average
try:
    data = sys.argv[2]
except IndexError:
    data = [
                [1400, 112000],
                [2400,192000],
                [1800,144000],
                [1900, 152000],
                [1300,104000],
                [1100,88000],
            ]
try:
    size_in_question = int(sys.argv[1])
except IndexError:
    size_in_question = 1300
print("\n", price_per_square_feet(size_in_question, data),"\n(Expect To Pay)\n", cost_per_square_feet(data), "\n(Price Per Square Foot)\n")
