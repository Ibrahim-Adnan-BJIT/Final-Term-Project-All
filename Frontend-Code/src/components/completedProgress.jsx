import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const CompletedProgress = () => {
  const [completedProgress, setCompletedProgress] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Only runs on component mount

  const handleFetchCompletedProgress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8091/api/progress/getCompletedProgress",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompletedProgress(response.data);
    } catch (error) {
      console.error("Error fetching completed progress:", error);
    }
  };

  useEffect(() => {
    handleFetchCompletedProgress();
  }, [token]);

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Completed Progress</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Progression (%)</th>
          </tr>
        </thead>
        <tbody>
          {completedProgress.map((progress) => (
            <tr key={progress.goalId}>
              <td>{progress.description}</td>
              <td>{progress.progression}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default CompletedProgress;
