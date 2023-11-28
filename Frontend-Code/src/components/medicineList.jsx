import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/v2/getAllMedicine",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [token]);

  const getImageForMedicine = (medicineId) => {
    return medicineId % 2 === 0
      ? "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
      : "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (medicineId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v2/delete/medicine/${medicineId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete medicine");
      }

      // Update the state or re-fetch medicines after deletion
      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine.medicineId !== medicineId)
      );

      // Show success toast
      toast.success("Medicine deleted successfully!");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      // Show error toast
      toast.error("Error deleting medicine");
    }
  };

  const handleUpdate = async (medicineId) => {
    navigate(`/medicine-update/${medicineId}`);
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="container mt-4">
        <h2 className="mb-4">List of Medicines</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by medicine name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="row row-cols-1 row-cols-md-3 card-deck">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.medicineId} className="col mb-4">
              <div className="card">
                <img
                  src={getImageForMedicine(medicine.medicineId)}
                  className="card-img-top"
                  alt={`Medicine ${medicine.medicineId}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{medicine.medicineName}</h5>
                  <p className="card-text">
                    Description: {medicine.description}
                  </p>
                  <p className="card-text">Expire Date: {medicine.expire}</p>
                  {userRole === "ADMIN" && (
                    <>
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => handleDelete(medicine.medicineId)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdate(medicine.medicineId)}
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MedicineList;
