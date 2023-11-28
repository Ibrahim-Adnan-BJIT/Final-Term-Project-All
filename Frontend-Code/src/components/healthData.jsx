import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateHealthData = () => {
  const [healthData, setHealthData] = useState({
    recordId: 0,
    height: 0,
    weight: 0,
    bloodPressure: "NORMAL", // Default value
    allergy: "NONE", // Default value
    diabetes: "NORMAL", // Default value
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Check if all fields are filled up
    const isValid =
      healthData.height > 0.5 &&
      healthData.height <= 2.0 &&
      healthData.weight > 0 &&
      healthData.weight <= 250 &&
      healthData.bloodPressure &&
      healthData.allergy &&
      healthData.diabetes;

    setIsFormValid(isValid);
  }, [healthData]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:8091/api/healthdata/update/record",
        {
          recordId: healthData.recordId,
          height: healthData.height,
          weight: healthData.weight,
          bloodPressure: healthData.bloodPressure,
          allergy: healthData.allergy,
          diabetes: healthData.diabetes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Health data updated successfully");
      } else {
        toast.error("Failed to update health data");
      }
    } catch (error) {
      console.error("Error updating health data:", error);
    }
  };

  const handleFetchData = async () => {
    try {
      // Assuming you have a recordId, replace it with the actual recordId
      // Replace with the actual recordId
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8091/api/healthdata/get/healthData`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHealthData(response.data);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <Container className="mt-5 p-4 border rounded">
      <h1 className="mb-4">Update Health Data</h1>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formHeight">
              <Form.Label>Height (m)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={healthData.height}
                onChange={handleChange}
                step="0.01"
                min="0.5"
                max="2.0"
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={healthData.weight}
                onChange={handleChange}
                max="250"
              />
            </Form.Group>

            <Form.Group controlId="formBloodPressure">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                as="select"
                name="bloodPressure"
                value={healthData.bloodPressure}
                onChange={handleChange}
              >
                <option value="NORMAL">Normal</option>
                <option value="ELEVATED">Elevated</option>
                <option value="HYPERTENSION_STAGE_1">
                  Hypertension Stage 1
                </option>
                <option value="HYPERTENSION_STAGE_2">
                  Hypertension Stage 2
                </option>
                <option value="HYPERTENSIVE_CRISIS">Hypertensive Crisis</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formAllergy">
              <Form.Label>Allergy</Form.Label>
              <Form.Control
                as="select"
                name="allergy"
                value={healthData.allergy}
                onChange={handleChange}
              >
                <option value="PEANUT">Peanut</option>
                <option value="LACTOSE">Lactose</option>
                <option value="GLUTEN">Gluten</option>
                <option value="SHELLFISH">Shellfish</option>
                <option value="TREE_NUT">Tree Nut</option>
                <option value="EGG">Egg</option>
                <option value="SOY">Soy</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDiabetes">
              <Form.Label>Diabetes</Form.Label>
              <Form.Control
                as="select"
                name="diabetes"
                value={healthData.diabetes}
                onChange={handleChange}
              >
                <option value="NORMAL">Normal</option>
                <option value="TYPE_1">Type 1</option>
                <option value="TYPE_2">Type 2</option>
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleUpdate}
              disabled={!isFormValid}
              className="mt-3"
            >
              Update Health Data
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default UpdateHealthData;
