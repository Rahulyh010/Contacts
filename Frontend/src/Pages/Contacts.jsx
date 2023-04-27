import React, { useEffect, useState } from "react";
import "../Styles/Contacts.css";
import axios from "axios";
import { Navbar } from "../Components/Navbar";

export const Contacts = () => {
  const [btn, setBtn] = useState(0);
  const [arr, setArr] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  function defaultdata() {
    axios
      .get(`http://localhost:8080/contacts/1`, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getData() {
    axios
      .get(`http://localhost:8080/contacts`)
      .then((res) => {
        console.log(res);
        // setBtn(res.data.length);
        let n = res.data.length / 10;
        n = Math.ceil(n);
        setBtn(n);
        let a = new Array(n).fill(0);
        console.log(a);
        setArr(a);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePage() {
    //i= +i+1;

    //console.log(i)
    axios
      .get(`http://localhost:8080/contacts/${page}`, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function delete1(i) {
    axios
      .delete(`http://localhost:8080/contacts/delete/${i}`, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((res) => {
        //setData(res.data);
        console.log(res);
        alert("SucessFully Deleted");
        //window.onload()
        //defaultdata();
        handlePage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    defaultdata();
    getData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleName() {
    console.log(name);
    axios
      .get(`http://localhost:8080/contacts/searchbyname/${name}`, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((e) => {
        console.log(e);
        setSearch1(e.data);
        setDis(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function handleemail() {
    axios
      .get(`http://localhost:8080/contacts/searchbyemail/${email}`, {
        headers: {
          Authorization: "rahul1234",
        },
      })
      .then((e) => {
        console.log(e);
        setSearch1(e.data);
        setDis(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [dis, setDis] = useState(true);
  const [search1, setSearch1] = useState([]);

  const [user, SetUser] = useState({
    name: "",
    number: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .patch(`http://localhost:8080/contacts/edit/${id}`, user, {
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
        setFormdis(false);
        // defaultdata()
        handlePage();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [id, setId] = useState("");

  const [formdis, setFormdis] = useState(false);

  return (
    <div>
      <Navbar />

      <div id="search">
        <div>
          <input
            type="text"
            placeholder="Search By Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleName}>Search</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search By Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleemail}>Search</button>
        </div>
      </div>

      <div style={{ display: dis ? "none" : "block" }} id="ser">
        <button onClick={() => setDis(true)}>Hide</button>
        {search1.map((e) => {
          return (
            <div>
              <p>Name: {e.name}</p>
              <p>Number:{e.number}</p>
              <p>Email: {e.email}</p>
            </div>
          );
        })}
      </div>

      <div>
        <form
          id="form"
          style={{ display: formdis ? "block" : "none" }}
          onSubmit={handleSubmit}
          className="form1"
        >
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

        <h1>Contact Details</h1>
      </div>
      <table style={{ marginLeft: dis ? "25%" : "40%" }}>
        <thead>
          <tr>
            <td>Sn No</td>
            <td>Name</td>
            <td>Number</td>
            <td>Email ID</td>
            <td>delete</td>
            <td>Edit</td>
          </tr>
        </thead>

        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td> {e.name}</td>
                <td>{e.number}</td>
                <td>{e.email}</td>
                <td onClick={() => delete1(e._id)}>Delete</td>
                <td
                  onClick={() => {
                    setId(e._id);
                    setFormdis(true);
                  }}
                >
                  Edit
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: "50px" }}>
        Pages:-
        {arr.map((e, i) => {
          return (
            <button
              onClick={() => {
                handlePage();
                setPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
