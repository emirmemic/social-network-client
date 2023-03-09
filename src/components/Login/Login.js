import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      console.log("text");
      const response = await axios.post(
        process.env.REACT_APP_API + "/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      localStorage.removeItem("token");
      if (response.status === 200 && response.data) {
        localStorage.setItem("token", response.data.token);
        navigate("/posts");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="loginWrapper">
      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn1" type="button" onClick={handleSubmit}>
        Log In
      </button>
    </form>
  );
};

export default Login;
