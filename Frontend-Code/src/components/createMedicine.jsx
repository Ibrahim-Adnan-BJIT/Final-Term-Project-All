import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateMedicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [expire, setExpire] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    // Validate fields
    if (!medicineName || !description || !expire) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v2/create/medicine",
        {
          medicineName,
          description,
          expire,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast
      toast.success("Medicine created successfully!");

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Show error toast
      toast.error(`Error creating medicine: ${error.response.data.message}`);
      // Handle errors
      console.error("Error creating medicine:", error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Create Medicine</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="medicineName">Medicine Name</label>
              <input
                type="text"
                className="form-control"
                id="medicineName"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expire">Expire Date</label>
              <input
                type="date"
                className="form-control"
                id="expire"
                value={expire}
                onChange={(e) => setExpire(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Create Medicine
            </button>
          </form>
        </div>
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateMedicine;
