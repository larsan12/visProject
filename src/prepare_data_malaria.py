import pandas as pd
import numpy as np

import csv
import json

pd.set_option('display.max_rows', 1000)
pd.set_option('display.max_columns', 1000)

path = "./data/"

name = "Malaria mortality by country"
df = pd.read_csv(path + name + ".csv", sep=",")
df = df.set_index(["Country"])

def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

for i in range(df.shape[0]):
    row = df.iloc[i]
    for column in df:
        num = row[column]
        if not isfloat(num):
            num = num.replace(" ", "")
        df.iloc[i][column] = num

df.to_json(path + name + ".json", orient="columns")


