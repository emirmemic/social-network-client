import React from "react";

const User = ({user}) => {
    console.log(user);
    return (
        <div className="user-wrapper">
        <div className="profile-image">
        {user && user.image && user.image ? <img src={user.image} alt={user.username} /> : <div className="auto-image">{user && user.username.charAt(0).toUpperCase()}</div>}
        </div>
            <h4 className="username">{user && user.username}</h4>
        </div>
    );
}

export  default User;