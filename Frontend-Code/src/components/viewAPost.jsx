import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch post details
        const response = await axios.get(
          `http://localhost:8070/api/community/getSinglePost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleUpvote = async () => {
    try {
      const token = localStorage.getItem("token");

      // Make an API request to upvote
      await axios.put(
        `http://localhost:8070/api/community/upVotes/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state or re-fetch the post details if needed
      // ...

      toast.success("Thumbs Up!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/see-community");
    } catch (error) {
      console.error("Error upvoting:", error);
      toast.error("Error upvoting post. Please try again.");
    }
  };

  const handleDownvote = async () => {
    try {
      const token = localStorage.getItem("token");

      // Make an API request to downvote
      await axios.put(
        `http://localhost:8070/api/community/downVotes/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state or re-fetch the post details if needed
      // ...

      toast.success("Thumbs Down!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/see-community");
    } catch (error) {
      console.error("Error downvoting:", error);
      toast.error("Error downvoting post. Please try again.");
    }
  };

  const handleComments = () => {
    navigate(`/comments/${postId}`);
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Post Details</h1>

        <Row>
          <Col md={8} className="mx-auto">
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  <strong>Author:</strong> {post.author}
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {post.description}
                </Card.Text>
                <Card.Text>
                  <strong>Upvotes:</strong> {post.upVote}
                </Card.Text>
                <Card.Text>
                  <strong>Downvotes:</strong> {post.downVote}
                </Card.Text>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={handleUpvote}
                >
                  👍 Thumbs Up
                </Button>
                <Button
                  variant="danger"
                  className="mr-2"
                  onClick={handleDownvote}
                >
                  👎 Thumbs Down
                </Button>
                <Button variant="info" onClick={handleComments}>
                  Comments
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostDetails;
