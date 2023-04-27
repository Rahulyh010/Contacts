import React, { useState } from "react";
import { Navbar } from "../Components/Navbar";
import "../Styles/Form.css";
import axios from "axios";

export const AddContact = () => {
  const [user, SetUser] = useState({
    name: "",
    number: "",
    email: "",
  });

  function HandleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/contacts/add`, user, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((e) => {
        // console.log(e)
        alert("SucessFully Added");
        SetUser({
          name: "",
          number: "",
          email: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <Navbar />
      <div>
        <form id="form" onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="name"
            value={user.name}
            onChange={(e) => SetUser({ ...user, name: e.target.value })}
            required
          />{" "}
          <br />
          <input
            pattern=".{10,}"
            value={user.number}
            onChange={(e) => SetUser({ ...user, number: e.target.value })}
            required
            title="10 characters minimum"
            placeholder="Ph Number"
          />{" "}
          <br />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => SetUser({ ...user, email: e.target.value })}
            required
          />{" "}
          <br />
          <input type="submit" value="Submit" /> <br />
        </form>
      </div>
    </div>
  );
};
