import "./styles.css";
import React, { useState, useEffect } from "react";
export default function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/demo", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());

    console.log(res);
  };

  const getUSers = async () => {
    const res = await fetch("http://localhost:3000/demo", {
      method: "GET",
    }).then((res) => res.json());

    console.log(res);
    setUsers(res);
  };

  useEffect(() => {
    getUSers();
  }, [ users]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Username</p>
        <input type="text" name="username" onChange={handleChange}></input>
        <p>Password</p>
        <input type="text" name="passwd" onChange={handleChange}></input>
        <p>
          <button type="submit">Submit</button>
        </p>
      </div>
      <div>
        <ul>
          {
          users.map((user)=>  (<li>{user.username} {user.password}</li>))
          }
        </ul>
      </div>
    </form>
  );
}
