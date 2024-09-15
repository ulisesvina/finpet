import requests
import pandas as pd
import random
from cfmodels import service_model
from keys import *

# DATASET STUFF
file_path = r'datasetai.csv'
data = pd.read_csv(file_path)

#MODEL
API_BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{count_id}/ai/run/"
def run(model, inputs):
    headers = {"Authorization": workers_key}
    input_data = {
        "messages": inputs,
        "max_tokens": 3
    }
    try:
        response = requests.post(f"{API_BASE_URL}{model}", headers=headers, json=input_data)
        response.raise_for_status()
        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

name = (str(input("Name: ")))

my_prompt = f'You decided, based on the salary mensual, Job,the bills,Description, and how % of the salary is going into JOB or Hobbies (and any other important things) IF the buy was good or bad. JUST SAY "GOOD" or "BAD"'
data = data.to_dict(orient='records')


inputs = [
    { "role": "system", "content": f"{my_prompt}" },
    { "role": "user", "content": f"{data}" }
]

output = run(service_model, inputs)
