import React, { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";

const NewPostForm = (props) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = { author, title, content };
    console.log("Post to be created:", post);
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/posts/create",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      props.updatePosts();
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <form className="create-post-wrapper">
      <div className="input-field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="input-field">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          rows={5}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>Create Post</Button>
    </form>
  );
};

export default NewPostForm;

// import React, { useState } from "react";
// import axios from "axios";

// const NewPostForm = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await axios.post("http://localhost:3001/createPost", {

//       title,
//       content,

//     });
//     console.log(response.data);
//     setTitle("");
//     setContent("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <div>
//         <label>Title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Content:</label>
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <div>
//         <button type="submit">Create Post</button>
//       </div>
//     </form>
//   );
// };

// export default NewPostForm;
