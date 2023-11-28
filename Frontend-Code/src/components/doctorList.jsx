import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorList = () => {
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

  return (
    <div className="page-section">
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
                    to={`/appointments/${doctor.doctorId}`}
                    className="btn btn-primary"
                  >
                    See Appointments
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

export default DoctorList;
