from flask import Flask, request, jsonify
from pymongo import MongoClient
# from dotenv import load_dotenv
from bson.objectid import ObjectId
# Load environment variables from .env file
# load_dotenv()

import os

# Initialize Flask app
app = Flask(__name__)

# MongoDB Initialization
# Use environment variables for credentials (e.g., MongoDB connection URI, Firebase config)
mongo_uri = 'mongodb+srv://maxzermeno03:123@clusterhackmty2024.wec2n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHackMTY2024'
client = MongoClient(mongo_uri)
db = client['HackMTY2024']
users_collection = db['users']


# Add new user with Firebase Auth and MongoDB
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']

    user_data = {

        'username': username,
        'email': email,
        'password': password
    }

    # Insert user data into MongoDB
    users_collection.insert_one(user_data)
    return jsonify({"message": "User added successfully"}), 200

# Get user data
@app.route('/get_user', methods=['GET'])
def get_user():
    # Retrieve user data from MongoDB
    user = users_collection.find_one({'username': 'janedoe'})
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Update bank balance for user
@app.route('/update_balance', methods=['PATCH'])
def update_balance():

    data = request.json
    username = data['username']
    new_balance = data['bank_balance']

    # Update user's bank balance in MongoDB
    users_collection.update_one({'username': username}, {'$set': {'bank_balance': new_balance}})
    return jsonify({"message": "Bank balance updated"}), 200

# Update pet's experience for authenticated user
@app.route('/update_pet_experience', methods=['PATCH'])
def update_pet_experience():
    data = request.json
    petid = data['_id']
    new_exp = int(data['exp'])
    

    # Define the filter and update operations
    filter_query = {"_id": petid}
    update_query = {"$inc": {"exp": new_exp}}

    # Perform the update operation
    result = users_collection.update_one(filter_query, update_query)

    # Check if the update was successful
    if result.matched_count > 0:
        print("Update successful")
    else:
        print("No document matched the query")

    return jsonify({"message": "Pet experience updated"}), 200

# Delete user from MongoDB
@app.route('/delete_user/<userid>', methods=['DELETE'])
def delete_user(userid):

    # Delete the user from MongoDB
    users_collection.delete_one({'_id': userid})
    return jsonify({"message": "User deleted"}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)


#por si se ocupa
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi

# uri = "mongodb+srv://maxzermeno03:LLuEnvePdc166AIf@clusterhackmty2024.wec2n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHackMTY2024"

# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))

# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)