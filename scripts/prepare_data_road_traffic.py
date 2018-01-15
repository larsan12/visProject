import pandas as pd
import numpy as np

import csv
import json

pd.set_option('display.max_rows', 1000)
pd.set_option('display.max_columns', 1000)

path = "./data/"

def isfloat(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

name = "Road traffic mortality by country"
df = pd.read_csv(path + name + ".csv", sep=",", dtype=str)
df = df.set_index(["Country"])

for i in range(df.shape[0]):
    row = df.iloc[i]
    for column in df:
        num = row[column].split(" [")[0].replace(" ", "")
        df.iloc[i][column] = num

df.to_json(path + name + ".json", orient="columns")


