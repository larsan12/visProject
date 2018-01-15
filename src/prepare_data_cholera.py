import pandas as pd
import numpy as np

import csv
import json

pd.set_option('display.max_rows', 1000)
pd.set_option('display.max_columns', 1000)

path = "./data/"

name = "Cholera mortality by country"
df = pd.read_csv(path + name + ".csv", sep=",")
print(df.columns.values)

years = []
for i in range(df.shape[0]):
    row = df.iloc[i]
    if row["Year"] not in years:
        years.append(row["Year"])

columns = [df.columns.values[0]] + years
result_df = pd.DataFrame(columns=columns)

grouped_df = df.groupby(["Country"])
for key, data in grouped_df:
    series_data = {}
    series_data["Country"] = key
    for i in range(data.shape[0]):
        row = data.iloc[i]
        series_data[row["Year"]] = row[df.columns.values[2]]
    series = pd.Series(series_data)
    result_df = result_df.append(series, ignore_index = True)

result_df.to_csv(path + name + "2.csv", index=False, encoding='utf8')
result_df = result_df.set_index(["Country"])

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

result_df.to_json(path + name + ".json", orient="columns")



