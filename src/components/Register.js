import React, { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // ovdje možeš napraviti redirekciju na neku drugu stranicu
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div>
      <h1>Registracija korisnika</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail adresa:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Korisnicko ime:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Lozinka:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Register;
