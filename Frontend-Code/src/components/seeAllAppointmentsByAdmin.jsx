import React, { useState, useEffect } from "react";

const SeeAppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8081/api/v2/getAllAppointments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Appointments List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Type</th>
            <th>Room Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.location}</td>
              <td>{appointment.date}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
              <td>{appointment.type}</td>
              <td>{appointment.roomNumber}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeAppointmentsList;
