import React, { useState } from "react";
import User from "../User/User";
import EditComment from "./EditComment";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

const Comments = (props) => {
  const [_post, setPost] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdate = (updatedPost) => {
    setPost(updatedPost);
    setShowModal(false);
  };

  const handleDeleteComment = async (comment_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/comments/deleteComment/${comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      props.updateComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments-wrapper">
      {props.comments &&
        props.comments.map((comment, i) => (
          <div className="comments" key={comment._id + "-" + i}>
            <User user={comment.author} />
            <p>{comment.content}</p>

            <div className="edit">
              {comment.author._id === localStorage.getItem("user") && (
                <button
                  className="control-icon"
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              {comment.author._id === localStorage.getItem("user") && (
                <button 
                  className="control-icon"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                />
                </button>
              )}
            </div>
            <Modal
              className="modal"
              centered={true}
              show={showModal}
              onHide={handleCloseModal}
            >
              <Modal.Header>
                <Modal.Title>Edit comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditComment
                  comment={comment}
                  updateComments={props.updateComments}
                  onUpdate={handleUpdate}
                  onCancel={handleCloseModal}
                />
              </Modal.Body>
            </Modal>
          </div>
        ))}
    </div>
  );
};

export default Comments;
