import React, { useEffect, useState } from "react";
import NewComment from "../Comments/newComment";
import Comments from "../Comments/comments";
import axios from "axios";
import User from "../User/User";
import { useParams, useSearchParams } from "react-router-dom";

const Post = (props) => {
  let { id } = useParams();

  const [_post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(id ? true : false);
  const handleShare = () => {
    let url = window.location.origin + "/post/" + _post._id;
    navigator.clipboard.writeText(url);
    window.open(url, "_blank");
  };
  const fetchPost = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API + "/api/posts/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
      console.log("post.data");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async (post_id) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + "/api/comments/getComments/" + post_id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchPost();
      getComments(id);
    } else {
      setPost(props);
      getComments(props._id);
    }
  }, []);
  useEffect(() => {
    if (_post && _post._id) {
      getComments(_post._id);
    }
  }, [showComments]);
  return (
    <div className="post-wrapper">
      <div className="post" key={_post._id}>
        <User user={_post.author} />
        <h2 className="post-title">{_post.title}</h2>
        <p className="post-content">{_post.content}</p>
      </div>
      <div className="controls">
        <div>Like</div>
        <div
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          Comment
        </div>
        <div onClick={handleShare}>Share</div>
      </div>
      {showComments && (
        <div className="post-comments">
          <NewComment
            getComments={() => getComments(_post._id)}
            postID={_post._id}
          />
          <Comments comments={comments} postID={_post._id} />
        </div>
      )}
    </div>
  );
};

export default Post;
