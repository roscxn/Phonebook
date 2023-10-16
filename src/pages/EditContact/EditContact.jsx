import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";

const EditContact = () => {

    const { id } = useParams();

    const [contactInfo, setContactInfo] = useState([]);

    useEffect(() => {
      fetch(`/api/contacts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("FRONT END EDIT", data)
          setContactInfo(data);
        })
    }, []);

    return (
        <div className="mockup-phone border-primary">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1">  
  
          <NavBar />
  
          <h1 className='mt-12'>Edit Contact</h1>
  
          <form>
          {/* <form onSubmit={handleSubmit}> */}

          <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              id="name"
              name="name"
            //   value={formData.name}
            //   onChange={handleChange}
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
            //   value={formData.number}
            //   onChange={handleChange}
              min="8"
              max="8"
              required
            />
          </div>
      
          <button className="btn btn-wide btn-primary mt-6" type="submit">Submit</button>
        </form>
        <div className="alert m-12">
          {/* <span className="text-md">{submitMessage && <p>{submitMessage}</p>}</span> */}
        </div> 
        
      </div>
      </div>
          </div>
    )
}

export default EditContact;