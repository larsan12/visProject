import pandas as pd
import numpy as np

import csv
import json

#pd.set_option('display.max_rows', 1000)
#pd.set_option('display.max_columns', 1000)

path = "./data/"
name = "TB mortality by country"
df = pd.read_csv(path + name + ".csv", sep=",")
grouped_df = df.groupby(["Country"])

population_df = pd.read_csv("../data/population.csv")
grouped_population_df = population_df.groupby(["Country Name"])

for key, data in grouped_df:
    if key not in population_df["Country Name"].unique():
        print(key)

#for key, data in grouped_population_df:
    #print(key)
"""
for i in range(df.shape[0]):
    row = df.iloc[i]
    for column in df:
        num = row[column].replace(" ", "")
        df.iloc[i][column] = num
"""
df.to_json(path + name + ".json", orient="columns")


