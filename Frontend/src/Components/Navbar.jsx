import React from "react";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div id="navbar">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <h1>
        <Link to="/contacts">Contacts</Link>{" "}
      </h1>
      <h1>
        <Link to="/AddContact">Add Contact</Link>
      </h1>
    </div>
  );
};
