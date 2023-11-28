import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  const { groupId } = useParams(); // Access groupId from params

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8070/api/community/getByPatientIdAndGroupId/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyPosts(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };

    fetchMyPosts();
  }, [groupId]); // Include groupId in the dependency array

  const handleEditPost = (postId) => {
    // Navigate to the edit post page with the post ID
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      // Hit the delete post API
      await axios.delete(
        `http://localhost:8070/api/community/delete/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful deletion, fetch updated posts
      const response = await axios.get(
        `http://localhost:8070/api/community/getByPatientIdAndGroupId/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyPosts(response.data);

      // Show success toast
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);

      // Show error toast
      toast.error("Error deleting post. Please try again.");
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">My Posts</h1>

        {myPosts.map((post) => (
          <Card
            key={post.postId}
            className="mb-4"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Card.Body>
              <Card.Text>
                <strong>Author:</strong> {post.patientId}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {post.description}
              </Card.Text>
              <Button
                variant="warning"
                onClick={() => handleEditPost(post.postId)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="ml-2"
                onClick={() => handleDeletePost(post.postId)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default MyPosts;
