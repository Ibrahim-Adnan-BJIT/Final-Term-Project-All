import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const UpdateGoal = () => {
  const { goalId } = useParams(); // Get goalId from the route parameters
  const [goal, setGoal] = useState({
    goalId: 0,
    description: "",
    progression: 0,
  });
  const [token, setToken] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token"); // Replace "your_token_key" with the actual key you use for storing the token
    console.log(goalId);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Only runs on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({
      ...goal,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Check if description is not null
      if (!goal.description.trim()) {
        toast.error("Description cannot be empty");
        return;
      }

      const response = await axios.put(
        `http://localhost:8091/api/progress/update/${goalId}`,
        goal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Goal updated successfully");
      } else {
        toast.error("Failed to update goal");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("An error occurred while updating goal");
    }
  };

  useEffect(() => {
    // Check if all fields are filled up
    const isValid =
      goal.description.trim() !== "" &&
      goal.progression >= 0 &&
      goal.progression <= 100;

    setIsFormValid(isValid);
  }, [goal]);

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Update Goal</h1>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={goal.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formProgression">
              <Form.Label>Progression (%)</Form.Label>
              <Form.Control
                type="number"
                name="progression"
                value={goal.progression}
                onChange={handleChange}
                min={0}
                max={100}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={!isFormValid}
          className="mt-3"
        >
          Update Goal
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default UpdateGoal;
