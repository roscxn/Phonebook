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

          if (formData.name.length < 2 || formData.name.length > 15) {
              setSubmitMessage("Name must be between 2 and 10 characters.");

          } else if (!/^\d+$/.test(formData.number)) {
              setSubmitMessage("Numerical digits only");

          } else if (formData.number.length !== 8) {
              setSubmitMessage("Number must be exactly 8 digits.");

          } else if (formData.number < 0) {
              setSubmitMessage("Number must be a non-negative integer.");

          } else {
              setFormData(initialFormData);
              setSubmitMessage("Contact details updated successfully");
          }
      } else {
          setSubmitMessage("Failed to update contact details");
      }
  } catch (error) {
      console.error(error);
      setSubmitMessage("An unexpected error occurred. Please try again later.");
  }
  };

    return (
      <div className="mockup-phone border-primary">
      <div className="camera"></div> 
      <div className="display">
        <div className="artboard artboard-demo phone-1 bg-base-100">  

        <NavBar />

        <h1 className='mt-16 text-lg'>Add New Contact</h1>

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
                minLength="2"
                maxLength="15"
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
                minLength="8"
                maxLength="8"
                pattern="[0-9]{8}" 
                required
              />
            </div>
  
          <button className="btn mt-6 btn-wide btn-primary" type="submit">Submit</button>
      </form>

        <div className="alert m-6 bg-base-100">
          <span className="text-md">{submitMessage && <p>{submitMessage}</p>}</span>
        </div> 
      
      </div>
    </div>
    </div>

  )
}

export default AddContact;