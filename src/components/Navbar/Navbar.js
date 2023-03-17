import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setuser] = useState({});
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API + "/api/users/searchUsers",
          {
            searchTerm,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + "/api/users/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setuser(response.data);
      console.log("current user");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  // test

  return (
    <div className="navbar-wrapper">
      <div className="logo">
        <h1>IQ SOCIAL MEDIA</h1>
      </div>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-results">
          {searchResults.map((user) => (
            <div key={user._id}>{user.username}</div>
          ))}
        </div>
      </form>
      <div className="user-info">
        <h5>{user && user.username}</h5>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
