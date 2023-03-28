import React, { useEffect, useState } from "react";
import NewComment from "../Comments/newComment";
import Comments from "../Comments/comments";
import axios from "axios";
import User from "../User/User";
import { useParams } from "react-router-dom";
import NewLike from "../Likes/newLike";
import EditPost from "./EditPost";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";


const Post = (props) => {
  let { id } = useParams();
  const [_post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(id ? true : false);
  const [showModal, setShowModal] = useState(false);

const handleCloseModal = () => {
  
  setShowModal(!showModal);
};

  const isYourPost = () => {
    if (
      _post &&
      _post.author &&
      _post.author._id === localStorage.getItem("user")
    ) {
      console.log("Not your post");
      return true;
    } else {
      return false;
    }
  };
  

  const handleUpdate = (updatedPost) => {
    setPost(updatedPost);
    setShowModal(false);
  };

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
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postID) => {
    if (isYourPost()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `${process.env.REACT_APP_API}/api/posts/deletePost/${postID}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        props.updatePosts && (await props.updatePosts());
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      getComments(id);
    } else {
      setPost({ ...props });
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
        <div className="test">
          <User user={_post.author} />
          
          <div className="edit">
          
            {isYourPost() && (
            <button className="control-icon" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            )}
            {isYourPost() && (
              <button
              className="control-icon"
              onClick={() => handleDeletePost(_post._id)}
              >             
              <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            )}
          </div>
        </div>

        <h2 className="post-title">{_post.title}</h2>
        <p className="post-content">{_post.content}</p>
      </div>
      <div className="controls">
        <div className="post-likes">
          <NewLike postID={id ? id : props._id} />
        </div>
        <div
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          Comment
        </div>
        <div onClick={handleShare}>Share</div>
        
      </div>
        <Modal className="modal" centered={true} show={showModal} onHide={handleCloseModal} >
          <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <EditPost post={_post} onUpdate={handleUpdate} onCancel={handleCloseModal} />
          </Modal.Body>
        </Modal>
      
      {showComments && (
        <div className="post-comments">
          <NewComment
            getComments={() => getComments(_post._id)}
            postID={_post._id}
          />
          <Comments
            comments={comments}
            postID={_post._id}
            updateComments={() => {
              getComments(_post._id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
