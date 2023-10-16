import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";

const EditContact = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [contactInfo, setContactInfo] = useState({
        name: "",
        number: ""
    });
    
    const [editMessage, setEditMessage] = useState('')

    useEffect(() => {
      fetch(`/api/contacts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setContactInfo(data.contact);
        })
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const handleDelete = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/contacts/${id}`, 
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contactInfo)
            });
            if (response.ok) {
                setEditMessage("Contact deleted")
                navigate("/")
            } else {
                setEditMessage("Failed to delete contact")
            }
        } catch (error) {
            console.error(error);
            setEditMessage("An unexpected error occurred. Please try again later.");
        }
    }

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        try {
            if (contactInfo.name.length < 2 || contactInfo.name.length > 15) {
                setEditMessage("Name must be between 2 and 15 characters.");
            } else if (!/^\d+$/.test(contactInfo.number)) {
                setEditMessage("Phone number must contain only numerical digits.");
            } else if (contactInfo.number.length !== 8) {
                setEditMessage("Phone number must be exactly 8 digits.");
            } else if (contactInfo.number < 0) {
                setEditMessage("Number must be a non-negative integer.");
            } else {
                const response = await fetch(`/api/contacts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contactInfo),
                });
    
                if (response.ok) {
                    setEditMessage("Contact details updated successfully");
                } else {
                    setEditMessage("Failed to update contact details");
                }
            }
        } catch (error) {
            console.error(error);
            setEditMessage("An unexpected error occurred. Please try again later.");
        }
    };
    

    return (
        <div className="mockup-phone border-primary">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1 bg-base-100">  
  
          <NavBar />
  
                <form>
                <div className="flex items-center mt-6">
                    <h1 className="text-lg mt-6 flex-grow">Edit Contact</h1>

                    <div className="tooltip" data-tip="Delete Contact">
                        <button className="btn mt-3" onClick={handleDelete}>
                            <img className="w-5 h-5" src="https://cdn-icons-png.flaticon.com/512/70/70757.png" alt="Delete" />
                        </button>
                    </div>
                </div>

                    <label className="label mt-6">
                        <span className="label-text">Name</span>
                    </label>
                        <input
                            className="input input-bordered w-full max-w-xs"
                            type="text"
                            id="name"
                            name="name"
                            value={contactInfo.name}
                            onChange={handleEditChange}
                            minLength="2"
                            maxLength="15"
                            required
                        />    
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                        <input
                            className="input input-bordered w-full max-w-xs"
                            type="tel"
                            id="number"
                            name="number"
                            value={contactInfo.number}
                            onChange={handleEditChange}
                            minLength="8"
                            maxLength="8"
                            pattern="[0-9]{8}" 
                            required
                        />
                    <div className="flex justify-between mt-6">
                    <button className="btn btn-outline">
                        <Link to={'/'}>Cancel</Link>
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                    </div>
                </form>
                <div className="alert m-6 bg-base-100">
                    <span className="text-md ">{editMessage && <p>{editMessage}</p>}</span>
                </div> 
            </div>
            </div>
        </div>
    )
}

export default EditContact;