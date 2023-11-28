import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateMedicine = () => {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState({});
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [expire, setExpire] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v2/getMedicine/${medicineId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMedicine(response.data);
        setMedicineName(response.data.medicineName);
        setDescription(response.data.description);
        setExpire(response.data.expire);
      } catch (error) {
        console.error('Error fetching medicine:', error);
      }
    };

    fetchMedicine();
  }, [medicineId, token]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/v2/update/medicine/${medicineId}`,
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

      // Handle the response as needed
      console.log(response.data);

      // Show success toast
      toast.success('Medicine updated successfully!', { position: toast.POSITION.BOTTOM_RIGHT });
      navigate("/medicine-list");
    } catch (error) {
      // Handle errors
      console.error('Error updating medicine:', error.response.data.message);
      // Show error toast
      toast.error('Error updating medicine', { position: toast.POSITION.BOTTOM_RIGHT });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h4 className="mb-0">Update Medicine</h4>
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
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update Medicine
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateMedicine;
