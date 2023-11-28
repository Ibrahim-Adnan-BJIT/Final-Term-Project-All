import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams(); // Access postId from params

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch post details using postId
        const response = await axios.get(
          `http://localhost:8070/api/community/getSinglePost/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the description from the fetched data
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleUpdatePost = async () => {
    try {
      const token = localStorage.getItem("token");

      // Hit the update post API
      await axios.put(
        `http://localhost:8070/api/community/update/post/${postId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast
      toast.success("Post updated successfully!");

      // Navigate back to the MyPosts page
      navigate("/see-community");
    } catch (error) {
      console.error("Error updating post:", error);

      // Show error toast
      toast.error("Error updating post. Please try again.");
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp">Edit Post</h1>

        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdatePost}>
            Update Post
          </Button>
        </Form>
      </div>

      {/* Toast Container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default EditPost;
