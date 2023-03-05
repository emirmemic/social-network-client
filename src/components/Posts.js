import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPosts")
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      {posts.map((posts) => (
        <div key={posts._id}>
          <h2>{posts.title}</h2>
          <p>{posts.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
