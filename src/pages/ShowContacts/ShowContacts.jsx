import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from 'react-router-dom';


const ShowContacts = () => {
  
  const [showContacts, setShowContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts/show")
      .then((response) => response.json())
      .then((data) => {
        setShowContacts(data.contacts);
      })
  }, []);

    return (

        <div className="mockup-phone border-primary">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1">  

      
          <NavBar/>

          <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {showContacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.number}</td>
                      <td>
                        <button className="btn btn-primary">
                          <Link to={`/contacts/${contact._id}`}>Edit</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
          </div>
        </div>
      </div>

    )
}

export default ShowContacts;