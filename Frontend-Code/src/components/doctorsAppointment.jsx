import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const DoctorAppointments = () => {
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchDoctorAppointments();
    } else {
      toast.error("Token not available. Please log in.");
    }
  }, [token]);

  const fetchDoctorAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v2/getAllAppointmentByDoctorId",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctorAppointments(response.data);
    } catch (error) {
      console.error("Error fetching doctor appointments:", error.message);
      toast.error("Error fetching doctor appointments. Please try again.");
    }
  };

  const handleSearch = () => {
    // Filter appointments based on the entered date
    const filteredAppointments = doctorAppointments.filter(
      (appointment) => appointment.date === searchDate
    );
    setDoctorAppointments(filteredAppointments);
  };

  const handleResetSearch = () => {
    // Reset the search and fetch all appointments again
    setSearchDate("");
    fetchDoctorAppointments();
  };

  const handleJoinRoom = (appointmentId) => {
    navigate(`/online-room/${appointmentId}`);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div>
        <h2 className="text-center mb-4">Doctor Appointments</h2>
        <Form className="mb-3">
          <Form.Group
            controlId="searchDate"
            className="d-flex align-items-center"
          >
            <Form.Label className="mr-2"></Form.Label>
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
              <th>Appointment ID</th>
              <th>Doctor ID</th>
              <th>Patient ID</th>
              <th>Location</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Type</th>
              <th>Room Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorAppointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.doctorId}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.location}</td>
                <td>{appointment.date}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.type}</td>
                <td>{appointment.roomNumber}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.type === "ONLINE" && (
                    <Button
                      variant="success"
                      onClick={() => handleJoinRoom(appointment.appointmentId)}
                    >
                      Join Room
                    </Button>
                  )}
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

export default DoctorAppointments;
