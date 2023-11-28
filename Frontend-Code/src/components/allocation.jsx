import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateResource = () => {
  const { doctorId } = useParams();
  const [roomNumber, setRoomNumber] = useState("");
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const token = localStorage.getItem("token");

  const allEquipments = [
    "STETHOSCOPE",
    "BLOOD_PRESSURE_MONITOR",
    "THERMOMETER",
    "OTOSCOPE",
    "OPHTHALMOSCOPE",
    "ECG_MACHINE",
    "X_RAY_MACHINE",
    "ULTRASOUND_MACHINE",
    "MRI_MACHINE",
    "DEFIBRILLATOR",
    "VENTILATOR",
    "INFUSION_PUMP",
    "SURGICAL_INSTRUMENTS",
    "DOPPLER_ULTRASOUND",
    "PULSE_OXIMETER",
    "NEBULIZER",
    "C_ARM",
    "BLOOD_GLUCOSE_METER",
    "WHEELCHAIR",
    "CRUTCHES",
    "HOSPITAL_BED",
    "INCUBATOR",
    "PACEMAKER",
    "COLPOSCOPE",
    "HOLTER_MONITOR"    
  ];

  const handleCheckboxChange = (equipment) => {
    if (selectedEquipments.includes(equipment)) {
      setSelectedEquipments(selectedEquipments.filter((eq) => eq !== equipment));
    } else {
      setSelectedEquipments([...selectedEquipments, equipment]);
    }
  };

  const handleSubmit = async () => {
    // Validate room number
    if (roomNumber.trim() === "") {
      toast.error("Room number cannot be blank!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v2/create/resource/${doctorId}`,
        {
          roomNumber,
          equipments: selectedEquipments,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast
      toast.success("Resource created successfully!");

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Show error toast
      toast.error(`Error creating resource: ${error.response.data.message}`);
      // Handle errors
      console.error("Error creating resource:", error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">Create Resource</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number</label>
              <input
                type="text"
                className="form-control"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Equipments</label>
              {allEquipments.map((equipment) => (
                <div className="form-check" key={equipment}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={equipment}
                    checked={selectedEquipments.includes(equipment)}
                    onChange={() => handleCheckboxChange(equipment)}
                  />
                  <label className="form-check-label" htmlFor={equipment}>
                    {equipment}
                  </label>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Create Resource
            </button>
          </form>
        </div>
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default CreateResource;
