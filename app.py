from flask import Flask, request, jsonify
from flask_cors import CORS
import os 
from dotenv import load_dotenv
from flask_pymongo import PyMongo

# Create a Flask application
app = Flask(__name__)
frontend_url = "http://localhost:5173" 
CORS(app, origins=frontend_url)  # Enable CORS for the entire app

load_dotenv()

app.config['MONGO_URI'] = os.getenv('MONGO_URI')  # Set your MongoDB URI from .env
mongo = PyMongo(app)

contacts = mongo.db.contacts


# Check connection
if mongo.cx.server_info():
    print("Successfully connected to MongoDB!")
else:
    print("Failed to connect to MongoDB.")


# Define routes and views
# @app.route('/')
# def home():
#     return 'Hello, World!'


@app.route('/api/contacts/add', methods=['POST'])
def add_contact():
    try:
        data = request.get_json()
        name = data.get('name')
        number = data.get('number')

        print('from app py', data)

        contact = {
            "name": name,
            "number": number
        }
      
        contacts.insert_one(contact)

        return jsonify({'message': 'Contact added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
  

@app.route('/api/contacts/show', methods=['GET'])
def get_contacts():
    try:
        all_contacts = list(contacts.find({}))

         # Convert the cursor to a list of dictionaries       
        contacts_list = [contact for contact in all_contacts]

        return jsonify({'contacts': contacts_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



# Run the Flask application if this is the main entry point
if __name__ == '__main__':
    app.run(debug=True)
