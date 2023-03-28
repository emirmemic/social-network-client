import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../../components/post/Posts";
import NewPostForm from "../../components/NewPost/NewPostForm";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const PostsPage = () => {
  let token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API + "/api/posts/getAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("post");
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="posts-page-wrapper">
      <Navbar />
      <div className="container">
        <div className="left">Left</div>
        <div className="center">
          <NewPostForm updatePosts={fetchPosts} />
          {posts.map((post, i) => (
            <Posts
              key={post._id + "-" + i}
              {...post}
              updatePosts={fetchPosts}
            />
          ))}
        </div>
        <div className="right">Right</div>
      </div>
    </div>
  );
};

export default PostsPage;
