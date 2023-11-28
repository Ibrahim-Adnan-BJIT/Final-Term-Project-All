import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleAddPost = async () => {
    try {
      // Check if the description is empty
      if (!description.trim()) {
        // Display an error message using toast
        toast.error("Please enter a post description.");
        return; // Prevent further execution
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8070/api/community/create/post/${groupId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Display success message using toast
      toast.success("Post added successfully!");

      // Redirect to the post list page
      navigate(`/category/${groupId}`);
    } catch (error) {
      // Display error message using toast
      toast.error("Error adding post. Please try again.");
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="mb-4 wow fadeInUp">Add a Post</h1>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAddPost}>
            Add Post
          </Button>
        </Form>

        {/* Toast container for displaying notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default AddPost;
