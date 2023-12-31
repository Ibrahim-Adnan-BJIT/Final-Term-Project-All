import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationDoctorPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error("Please fill in all fields.");
        return;
      }
    }

    // Send data to the API using Axios
    axios
      .post("http://localhost:9898/api/v2/auth/register/doctor", formData)
      .then((response) => {
        console.log(response.data);
        // Handle success
        toast.success("Registration successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
        toast.error("Registration failed. Please try again.");
      });
  };

  // Background image style
  const backgroundImageStyle = {
    backgroundImage: `url('https://img.freepik.com/free-vector/gradient-technological-background_23-2148884155.jpg?w=740&t=st=1701164773~exp=1701165373~hmac=c91733371c4bb5dfa6bcbccb2abc2b862b9eb78ae1218ec9c7aff93f0e79dae0')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Adjust this as needed
    width: "100%", // Updated to occupy the entire width
    height: "100%", // Updated to occupy the entire height
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={backgroundImageStyle}
    >
      <div className="card p-5">
        <h2 className="text-center mb-4">Registration Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <br />
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationDoctorPage;
