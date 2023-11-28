import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error("Please fill in all fields.");
        return;
      }
    }

    try {
      // Send data to the API using Axios
      const response = await axios.post(
        "http://localhost:9898/api/v2/auth/login",
        formData
      );

      console.log(response.data);

      // Assuming the API response includes a token and role
      const { token, role } = response.data;

      // Store token and role in local storage or state
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Navigate to the dashboard
      window.location.reload();

      // Handle success
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error:", error);

      // Handle error
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-5">
            <h2 className="text-center mb-4">Login Page</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <br />
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
