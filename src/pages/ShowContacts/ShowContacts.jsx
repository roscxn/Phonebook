import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

const ShowContacts = () => {

  const [showContacts, setShowContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts/show")
      .then((response) => response.json())
      .then((data) => {
        console.log("show contacts", data);
        setShowContacts(data);
      })
  }, []);

    return (

        <div className="mockup-phone border-primary">
        <div className="camera"></div> 
        <div className="display">
          <div className="artboard artboard-demo phone-1">  

      
          <NavBar />

          <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {showContacts.map((contact) => (
                      <li key={contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.number}</td>
                        <td><button className="btn btn-primary">Del</button></td>
                      </li>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div> 
          </div>
        </div>
      </div>

    )
}

export default ShowContacts;