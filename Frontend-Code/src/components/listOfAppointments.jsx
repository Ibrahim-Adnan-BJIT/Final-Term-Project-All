import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListOfAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace 'yourTokenKey' with your actual token key
    const token = localStorage.getItem("token");

    // Fetch appointments data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/v2/getAllAppointmentByPatientId",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelAppointment = (appointmentId) => {
    // Navigate to the cancel component with the appointmentId
    navigate(`/cancel-appointment/${appointmentId}`);
  };

  const handleEnterRoom = (appointment) => {
    // Check if the appointment type is ONLINE
    if (appointment.type === "ONLINE") {
      // Navigate to the room with the appointment details
      navigate(`/online-room/${appointment.appointmentId}`);
    }
  };

  return (
    <div className="mt-4 text-center">
      <h2>Your Appointments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor ID</th>
              <th>Location</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Type</th>
              <th>Room Number</th>
              <th>Status</th>
              <th>Action</th>
              <th>Enter Room</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.doctorId}</td>
                <td>{appointment.location}</td>
                <td>{appointment.date}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.type}</td>
                <td>{appointment.roomNumber}</td>
                <td>{appointment.status}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleCancelAppointment(appointment.appointmentId)
                    }
                  >
                    Cancel
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEnterRoom(appointment)}
                    disabled={appointment.type !== "ONLINE"}
                  >
                    Enter Room
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListOfAppointments;
