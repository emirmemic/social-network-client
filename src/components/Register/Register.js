import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(process.env.REACT_APP_API + "/api/auth/register", {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("token");
        console.log(data);
        if (data.success === true && data.newUser) {
          localStorage.setItem("token", data.token);
          navigate("/posts");
        }
        
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
    <div className="register-wrapper">
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
