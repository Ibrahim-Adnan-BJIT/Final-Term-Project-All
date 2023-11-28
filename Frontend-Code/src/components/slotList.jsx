import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySlots = () => {
  const [mySlots, setMySlots] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchMySlots();
    } else {
      toast.error("Token not available. Please log in.");
    }
  }, [token]);

  const fetchMySlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v2/getMyAllSlots",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMySlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error.message);
    }
  };

  const cancelSlot = async (slotId) => {
    try {
      await axios.post(
        `http://localhost:8081/api/v2/cancel/slots/${slotId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Slot canceled successfully");
      // After canceling, refetch the slots
      fetchMySlots();
    } catch (error) {
      console.error("Error canceling slot:", error.message);
      toast.error("Error canceling slot. Please try again.");
    }
  };

  const handleSearch = () => {
    // Filter slots based on the entered date
    const filteredSlots = mySlots.filter((slot) => slot.date === searchDate);
    setMySlots(filteredSlots);
  };

  const handleResetSearch = () => {
    // Reset the search and fetch all slots again
    setSearchDate("");
    fetchMySlots();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div>
        <h2 className="text-center mb-4">My Slots</h2>
        <Form className="mb-3">
          <Form.Group
            controlId="searchDate"
            className="d-flex align-items-center"
          >
            <Form.Label className="mr-2">Search by Date:</Form.Label>
            <Form.Control
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Button variant="primary" className="ml-2" onClick={handleSearch}>
              Search
            </Button>
            <Button
              variant="secondary"
              className="ml-2"
              onClick={handleResetSearch}
            >
              Reset
            </Button>
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Slot ID</th>
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mySlots.map((slot) => (
              <tr key={slot.slotId}>
                <td>{slot.slotId}</td>
                <td>{slot.doctorId}</td>
                <td>{slot.date}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
                <td>{slot.status}</td>
                <td>{slot.type}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => cancelSlot(slot.slotId)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default MySlots;
