import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateSkills = () => {
  const [speciality, setSpeciality] = useState("");
  const [qualification, setQualification] = useState("");
  const token = localStorage.getItem("token");

  const handleUpdateSkills = async () => {
    try {
      // Validate form data
      if (!speciality || !qualification) {
        toast.error("All fields are required!");
        return;
      }

      // Make PUT API request
      const response = await axios.put(
        "http://localhost:9898/api/v2/user/skills",
        {
          speciality: speciality,
          qualification: qualification,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        toast.success("updated successfully!");
        // Clear the form fields after successful submission
        setSpeciality("");
        setQualification("");
      } else {
        toast.error("Error updating skills. Please try again.");
      }
    } catch (error) {
      console.error("Error updating skills:", error.message);
      toast.error("Error updating skills. Please try again.");
    }
  };

  const specialityOptions = [
    "SURGICAL_SPECIALTIES",
    "INTERNAL_MEDICINE_SPECIALTIES",
    "PEDIATRICS_AND_CHILD_HEALTH_SPECIALTIES",
    "WOMENS_HEALTH_SPECIALTIES",
    "CANCER_AND_ONCOLOGY_SPECIALTIES",
    "NEUROLOGY_AND_PSYCHIATRY_SPECIALTIES",
    "EMERGENCY_MEDICINE_AND_CRITICAL_CARE_SPECIALTIES",
    "DIAGNOSTIC_AND_IMAGING_SPECIALTIES",
    "ANESTHESIA_AND_PAIN_MANAGEMENT_SPECIALTIES",
    "ALLERGY_AND_IMMUNOLOGY_SPECIALTIES",
  ];

  return (
    <Container className="mt-5">
      <h2>Your Speciality and Qualifications....</h2>
      <Form>
        <Form.Group>
          <Form.Label>Speciality:</Form.Label>
          <Form.Control
            as="select"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Speciality
            </option>
            {specialityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Qualification:</Form.Label>
          <Form.Control
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleUpdateSkills}>
          Update Skills
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default UpdateSkills;
