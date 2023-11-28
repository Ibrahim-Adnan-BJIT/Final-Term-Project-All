import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState({
    diabetesRecom: "",
    allergyRecom: "",
    bloodPressureRecom: "",
    bmiRecom: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8091/api/recommendation/getRecommendationByPatientId",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Recommendations</h1>
      <Card>
        <Card.Body>
          <Card.Title>Diabetes Recommendation:-</Card.Title>
          <Card.Text>{recommendations.diabetesRecom}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Allergy Recommendation:-</Card.Title>
          <Card.Text>{recommendations.allergyRecom}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Blood Pressure Recommendation:-</Card.Title>
          <Card.Text>{recommendations.bloodPressureRecom}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>BMI Recommendation:-</Card.Title>
          <Card.Text>{recommendations.bmiRecom}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Recommendations;
