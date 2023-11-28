import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetch comments for the specified post
        const response = await axios.get(
          `http://localhost:8070/api/community/getAllCommentsOfAPost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, token]);

  const handleCommentNow = async () => {
    try {
      // Make an API request to add a new comment
      await axios.post(
        `http://localhost:8070/api/community/create/comments/${postId}`,
        {
          description: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Display success message
      toast.success("Comment added successfully!");
      // Refetch comments to display the updated list

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Comments</h1>

        {comments.map((comment) => (
          <Card
            key={comment.commentId}
            className="mb-3"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Card.Body>
              <Card.Text>
                <strong>User ID:</strong> {comment.userId}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {comment.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}

        <Form>
          <Form.Group controlId="newComment">
            <Form.Label>Add Your Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCommentNow}>
            Comment Now
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Comments;
