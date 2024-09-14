import requests

def generate_pet_personality(user_data):
    # Lógica para interactuar con Cloudflare AI
    response = requests.post('https://cloudflare.ai/api/personality', json=user_data)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Error connecting to AI service')
