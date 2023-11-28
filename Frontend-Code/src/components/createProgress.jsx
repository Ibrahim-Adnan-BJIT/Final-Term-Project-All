import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProgress = () => {
  const [progressData, setProgressData] = useState({
    description: "",
    progression: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgressData({
      ...progressData,
      [name]: value,
    });
  };

  const handleCreateProgress = async () => {
    try {
      // Check if description is not null or empty
      if (!progressData.description.trim()) {
        toast.error("Description cannot be empty");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8091/api/progress/create",
        progressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Progress created successfully");
        // Optionally, you can clear the form after successful creation
        setProgressData({
          description: "",
          progression: 0,
        });
      } else {
        toast.error("Failed to create progress");
      }
    } catch (error) {
      console.error("Error creating progress:", error);
      toast.error("An error occurred while creating progress");
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Create Progress</h1>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={progressData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProgression">
              <Form.Label>Progression (%)</Form.Label>
              <Form.Control
                type="number"
                name="progression"
                value={progressData.progression}
                onChange={handleChange}
                min={0}
                max={100}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleCreateProgress}>
              Create Progress
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default CreateProgress;
