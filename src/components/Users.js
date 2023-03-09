import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/getUsers").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <p>Number of users: {users.length}</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Users;
