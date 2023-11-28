import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TakeAppointment = () => {
  const { slotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Make the POST request to book the appointment
    axios
      .post(`http://localhost:8081/api/v2/create/appointment/${slotId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Appointment booked successfully!");

        // After successful booking, navigate back to Dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(
          "Error booking appointment:",
          error.response.data.message
        );
        toast.error(error.response.data.message);
      });
  }, [slotId, navigate]);

  return (
    <div className="container mt-4">
      <h2>Take Appointment</h2>
      {/* You can customize this page as needed */}
      <ToastContainer />
    </div>
  );
};

export default TakeAppointment;
