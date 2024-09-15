import requests
import pandas as pd
import random
from keys import *

# DATASET STUFF
file_path = r'ai\ai_service.csv'
data = pd.read_csv(file_path)

#MODEL
API_BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{count_id}/ai/run/"
headers = {"Authorization": workers_key}


def run(model, inputs):
    headers = {"Authorization": workers_key}
    input_data = {
        "messages": inputs,
        "temperature": .9,  # creativity
        "max_tokens": 30
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

print(" Legend has it that many years ago, humans were born with their own companion creature to accompany them on their journey through life; as humans care for it, the creature grows. What is the personality of your dream companion? (Describe it: personality, etc.)")
user_pet = (str(input()))
name = (str(input("Name: ")))

my_prompt = f"Act as if you are the pet with the personality: {match}. Your name is {name}. Do not mention that you are an AI or that you are not real. Simply respond as if youve just been born. Keep your response within 30 tokens and complete your sentence."

inputs = [
    { role: "system", content: "You decided, based on the salary mensual, Job,the bills,Description, and how % of the salary is going into JOB or Hobbies (and any other important things) IF the buy was good or bad. JUST SAY "},
    { role: "user", content: "Salary: 2k, Job: Software Developer, Bills:200, Valorant Riot Games Skin, Not a hobby"},
    ]
output = run(, inputs)
