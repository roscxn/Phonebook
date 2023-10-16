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
          <div className="artboard artboard-demo phone-1 bg-base-100">  
          
          <NavBar />

          <div className="overflow-x-auto mt-24 mb-8">
          
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
                        <div className="tooltip" data-tip="Edit">
                          <button className="btn">
                            <Link to={`/contacts/${contact._id}`}>
                              <img className="w-5" src="https://w7.pngwing.com/pngs/124/142/png-transparent-pencil-edit-office-create-compose-edit-file-writing-creative-office-icon.png"/>
                            </Link>
                          </button>
                        </div>
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