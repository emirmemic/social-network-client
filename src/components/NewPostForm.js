import React, { useState } from "react";
import axios from "axios";

const NewPostForm = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = { author, title, content };
    console.log("Post to be created:", post);
    try {
      const response = await axios.post(
        "http://localhost:3001/createPost",
        post
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="id"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <button type="submit">Create Post</button>
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
