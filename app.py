from flask import Flask
from routes import auth_routes, user_routes, pet_routes

app = Flask(__name__)

app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)
app.register_blueprint(pet_routes)

if __name__ == '__main__':
    app.run(debug=True)