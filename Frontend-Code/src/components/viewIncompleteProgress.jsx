import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const IncompleteProgress = () => {
  const [incompleteProgress, setIncompleteProgress] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token"); // Replace "your_token_key" with the actual key you use for storing the token

    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Only runs on component mount

  const handleFetchIncompleteProgress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8091/api/progress/getInCompletedProgress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncompleteProgress(response.data);
    } catch (error) {
      console.error("Error fetching incomplete progress:", error);
    }
  };

  useEffect(() => {
    handleFetchIncompleteProgress();
  }, [token]);

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Incomplete Progress</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Progression (%)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {incompleteProgress.map((progress) => (
            <tr key={progress.goalId}>
              <td>{progress.description}</td>
              <td>{progress.progression}</td>
              <td>
                <Link
                  to={`/edit-progress/${progress.goalId}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default IncompleteProgress;
