import axios from "axios";

const register = (username, email, password) => {
  return axios.post(`${process.env.REACT_APP_API}/users/register`, {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(`${process.env.REACT_APP_API}/users/login`, {
    email,
    password,
  });
};
export default {
  register,
  login,
};
