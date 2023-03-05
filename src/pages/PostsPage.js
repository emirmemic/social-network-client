import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";
import NewPostForm from "../components/NewPostForm";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getPosts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (title, content) => {
    try {
      const response = await axios.post("http://localhost:3001/createPost", {
        title,
        content,
      });
      setPosts([...posts, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <NewPostForm onCreatePost={handleCreatePost} />
      {posts.map((posts) => (
        <Posts key={posts._id} post={posts} />
      ))}
    </div>
  );
};

export default PostsPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Posts from "../components/Posts";
// import NewPostForm from "../components/NewPostForm";

// const PostsPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/getPosts");
//         setPosts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const addPost = async (title, content) => {
//     try {
//       const response = await axios.post("http://localhost:3001/createPost", {
//         title,
//         content,
//       });
//       const newPost = response.data;
//       setPosts((prevPosts) => [...prevPosts, newPost]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Posts</h1>
//       <NewPostForm onAddPost={addPost} />
//       {posts.map((post) => (
//         <Posts key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default PostsPage;
