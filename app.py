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
CORS(app, origins=frontend_url)  

app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)
contacts = mongo.db.contacts

# Check MongoDB connection
if mongo.cx.server_info():
    print("Successfully connected to MongoDB!")
else:
    print("Failed to connect to MongoDB.")


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
        contact['_id'] = str(contact['_id'])
        contacts_list.append(contact)

    return jsonify({'contacts': contacts_list})
   

# Show specific contact information

@app.route('/api/contacts/<id>', methods=['GET'])
def show_contact(id):
     
    try:
        specific_contact = contacts.find_one({"_id": ObjectId(id)}) 
        specific_contact['_id'] = str(specific_contact['_id'])

        if specific_contact:
            return jsonify({'contact': specific_contact}), 200
            
        else:
            return jsonify({'error': 'Contact not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Delete specific contact

@app.route('/api/contacts/<id>', methods=['DELETE'])
def delete_contact(id):
    
        result = contacts.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return jsonify({"success": "Contact deleted successfully."})
        else:
            return jsonify({"error": "Failed to delete contact."})
        

# Edit specific contact

@app.route('/api/contacts/<id>', methods=['PUT'])
def edit_contact(id):

    json = request.json
    contact = contacts.find_one({"_id": ObjectId(id)}) 
    
    if contact:
        contact['name'] = json.get('name', contact['name'])
        contact['number'] = json.get('number', contact['number'])

        contacts.update_one({"_id": ObjectId(id)}, {"$set": contact})
        contact["_id"] = str(contact["_id"])
        contact.pop("contact", None)
        return jsonify(contact)
    else:
        return jsonify({"message": "Contact not found"})
   

# Run the Flask application if this is the main entry point
if __name__ == '__main__':
    app.run(debug=True)
