import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateDoctorSlots = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [type, setType] = useState("OFFLINE");

  const createDoctorSlots = async () => {
    if (!date || !startTime || !type) {
      toast.error("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not available. Please log in.");
      return;
    }

    const apiUrl = "http://localhost:8081/api/v2/create/slots";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      date: date,
      startTime: startTime,
      type: type,
    };

    try {
      await axios.post(apiUrl, requestBody, { headers });
      toast.success("Slot assingned successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(`Error creating doctor slots: ${message}`);
      } else {
        console.error("Error creating doctor slots:", error.message);
        toast.error("Error creating doctor slots. Please try again.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Doctor Slots</h2>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Start Time:</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Type:</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Button variant="primary" onClick={createDoctorSlots}>
          Create Slots
        </Button>
        <br />
        <br />
        <br />
        <br />
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default CreateDoctorSlots;
