import { useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";

const AddContact = () => {

  const initialFormData = {
    name: "",
    number:"",
  };

  const [formData, setFormData] = useState(initialFormData)
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/contacts/add', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData(initialFormData); 
        setSubmitMessage("Contact added successfully");
      } else {
        setSubmitMessage('Failed to add a new contact. Please try again.');
      }
    } catch (error) {
      setSubmitMessage("An unexpected error occurred. Please try again later.");
    }
  }

    return (
      <div className="mockup-phone border-primary">
      <div className="camera"></div> 
      <div className="display">
        <div className="artboard artboard-demo phone-1">  

        <NavBar />

        <h1 className='mt-12'>Add Contact</h1>

        <form onSubmit={handleSubmit}>
        <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength="1"
            maxLength="30"
            required
          />
        </div>
        <div>
        <label className="label">
          <span className="label-text">Phone Number</span>
        </label>
          <input
            className="input input-bordered w-full max-w-xs"
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            min="8"
            max="8"
            required
          />
        </div>
    
        <button className="btn btn-wide btn-primary mt-6" type="submit">Submit</button>
      </form>
      <div className="alert m-12">
        <span className="text-md">{submitMessage && <p>{submitMessage}</p>}</span>
      </div> 
      
    </div>
    </div>
        </div>

    )
}

export default AddContact;