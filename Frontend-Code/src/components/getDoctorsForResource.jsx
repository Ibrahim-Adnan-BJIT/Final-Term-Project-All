import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorResourceList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    // Fetch the list of doctors from the API with the token in the header
    axios
      .get("http://localhost:9898/api/v2/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      `${doctor.firstName} ${doctor.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="page-section" style={backgroundImageStyle}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search by doctor name or speciality"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="row">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.doctorId} className="col-md-4 mb-4">
              <div className="card text-center">
                <img
                  src={
                    doctor.doctorId % 2 === 0
                      ? "src/assets/img/doctors/doctor_2.jpg"
                      : "src/assets/img/doctors/doctor_3.jpg"
                  }
                  alt={
                    doctor.doctorId % 2 === 0
                      ? "Doctor Image 2"
                      : "Doctor Image 3"
                  }
                  className="card-img-top mx-auto" // Use mx-auto to center the image horizontally
                  style={{ width: "60%", height: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {doctor.firstName} {doctor.lastName}
                  </h5>
                  <p className="card-text">Speciality: {doctor.speciality}</p>
                  <Link
                    to={`/allocate/${doctor.doctorId}`}
                    className="btn btn-primary"
                  >
                    Allocate Resource
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorResourceList;
