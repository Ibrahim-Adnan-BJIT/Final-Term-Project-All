import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SlotsTable = () => {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Fetch the list of slots for the specified doctorId from the API with the token in the header
    axios
      .get(`http://localhost:8081/api/v2/getAllSlotsByDoctorId/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Axios Response:", response);
        setSlots(response.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [doctorId]);

  // Filter slots based on the search date
  const filteredSlots = searchDate
    ? slots.filter((slot) => slot.date === searchDate)
    : slots;

  return (
    <div className="container mt-4">
      <h2>Appointment Slots</h2>
      <div className="mb-3">
        <label htmlFor="searchDate" className="form-label">
          Search by Date:
        </label>
        <input
          type="date"
          className="form-control"
          id="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlots.map((slot) => (
            <tr key={slot.slotId}>
              <td>{slot.date}</td>
              <td>{slot.startTime}</td>
              <td>{slot.endTime}</td>
              <td>{slot.status}</td>
              <td>{slot.type}</td>
              <td>
                {slot.status === "Booked" || slot.status === "Unavailable" ? (
                  <button className="btn btn-secondary" disabled>
                    Book Appointment
                  </button>
                ) : (
                  <Link
                    to={`/take-appointment/${slot.slotId}`}
                    className="btn btn-primary"
                  >
                    Book Appointment
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlotsTable;
