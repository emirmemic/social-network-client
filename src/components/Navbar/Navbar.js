import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/users/searchUsers", {
            searchTerm,
          },{
            
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          },
          
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    handleSearch();
    
  },[searchTerm]);

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
      
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Navbar;
