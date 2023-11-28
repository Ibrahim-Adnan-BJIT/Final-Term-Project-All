import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Hit the cancel appointment API with the token in the header
    axios
      .post(
        `http://localhost:8081/api/v2/cancel/appointment/${appointmentId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Axios Response:", response);
        // Show success toast
        toast.success("Appointment canceled successfully!");
        // Navigate to the dashboard
        navigate("/see-appointments");
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        // Show error toast
        toast.error(`${error.response.data.message}`);
        // Navigate to the dashboard even in case of an error
        navigate("/see-appointments");
      });
  }, [appointmentId, navigate]);

  return (
    <div>
      {/* Optional: You can display a loading spinner or other content while the cancellation is in progress */}
      <ToastContainer />
    </div>
  );
};

export default CancelAppointment;
