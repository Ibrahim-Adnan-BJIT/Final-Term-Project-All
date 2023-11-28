import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const HealthDataList = () => {
  const [healthData, setHealthData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // Fetch the token from wherever it's stored in your application
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8091/api/healthdata/getAllHealthData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setHealthData(response.data);
        }
      } catch (error) {
        console.error("Error fetching health data:", error);
        setError("Error fetching health data. Please try again.");
      }
    };

    fetchHealthData();
  }, []);

  const downloadCSV = () => {
    const csvContent =
      "Record ID,Patient ID,Height,Weight,BMI,Blood Pressure,Allergy,Diabetes\n" +
      healthData
        .map(
          (data) =>
            `${data.recordId},${data.patientId},${data.height},${data.weight},${data.bmi},${data.bloodPressure},${data.allergy},${data.diabetes}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "healthdata.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h1 className="text-center mb-4">Health Data List</h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="text-left">
          <Button variant="primary" onClick={downloadCSV}>
            Download CSV
          </Button>
        </Col>
      </Row>

      {error && <p className="text-danger">{error}</p>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Patient ID</th>
            <th>Height</th>
            <th>Weight</th>
            <th>BMI</th>
            <th>Blood Pressure</th>
            <th>Allergy</th>
            <th>Diabetes</th>
          </tr>
        </thead>
        <tbody>
          {healthData.map((data) => (
            <tr key={data.recordId}>
              <td>{data.recordId}</td>
              <td>{data.patientId}</td>
              <td>{data.height}</td>
              <td>{data.weight}</td>
              <td>{data.bmi}</td>
              <td>{data.bloodPressure}</td>
              <td>{data.allergy}</td>
              <td>{data.diabetes}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HealthDataList;
