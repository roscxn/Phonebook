from flask import Flask, request, jsonify
from flask_cors import CORS
import os 
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from bson import ObjectId

# Create a Flask application
app = Flask(__name__)
load_dotenv()

frontend_url = "http://localhost:5173" 
CORS(app, origins=frontend_url)  # Enable CORS for the entire app

app.config['MONGO_URI'] = os.getenv('MONGO_URI')  # Set your MongoDB URI from .env
mongo = PyMongo(app)
contacts = mongo.db.contacts

# Check connection
if mongo.cx.server_info():
    print("Successfully connected to MongoDB!")
else:
    print("Failed to connect to MongoDB.")


# Define routes and views
@app.route('/')
def home():
    return ''

# Add new contact

@app.route('/api/contacts/add', methods=['POST'])
def add_contact():
    try:
        data = request.get_json()
        name = data.get('name')
        number = data.get('number')
        
        contact = {
            "name": name,
            "number": number
        }
      
        contacts.insert_one(contact)

        return jsonify({'message': 'Contact added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Show all contacts

@app.route('/api/contacts/show', methods=['GET'])
def get_contacts():
    contacts_list = []

    for contact in contacts.find():
        # Convert the ObjectId to a string
        contact['_id'] = str(contact['_id'])
        contacts_list.append(contact)

    # Use the jsonify function to send the data as JSON
    return jsonify({'contacts': contacts_list})
   

# Show specific contact information

@app.route('/api/contacts/<id>', methods=['GET'])
def show_contact(id):
     
    try:
        # Assuming 'contacts' is your MongoDB collection
        specific_contact = contacts.find_one({"_id": ObjectId(id)})  # You'll need to import 'ObjectId' from pymongo
        specific_contact['_id'] = str(specific_contact['_id'])

        if specific_contact:
            # You found the contact, and now you can return it as JSON
            return jsonify({'contact': specific_contact}), 200
            
        else:
            # Contact with the given ID was not found
            return jsonify({'error': 'Contact not found'}), 404
    except Exception as e:
        # Handle any exceptions or errors here
        return jsonify({'error': str(e)}), 500



# Run the Flask application if this is the main entry point
if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='localhost', port=5000)
