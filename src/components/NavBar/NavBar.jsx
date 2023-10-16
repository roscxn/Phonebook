import React, { useState } from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/contacts/add">Add New</Link>
            </li>
        </ul>
    )
}

export default NavBar;