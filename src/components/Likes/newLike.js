import React, { useState, useEffect } from "react";
import axios from "axios";

const NewLike = ({ postID }) => {
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState();
  let userId = localStorage.getItem("user");
  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/likes/getAllLikes/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let ll = response.data;
      setLikes([...ll]);
      setUserLike(ll.find((like) => like.author === userId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_API}/api/likes/createLike/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchLikes();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`newLike-wrapper ${
        userLike && userLike.author === userId ? "liked" : ""
      }`}
      onClick={handleLike}
    >
      Like
      <p>{likes && likes.length}</p>
    </div>
  );
};

export default NewLike;
