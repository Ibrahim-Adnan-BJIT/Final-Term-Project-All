import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    gender: "",
    number: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:9898/api/v2/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      // Check if required fields are filled
      if (
        !profile.firstName ||
        !profile.lastName ||
        !profile.dob ||
        !profile.email ||
        !profile.gender ||
        !profile.number
      ) {
        setValidationError("Please fill in all required fields.");
        return;
      }

      // Clear previous validation error
      setValidationError("");

      // Use the PUT request to update the user profile
      await axios.put(
        "http://localhost:9898/api/v2/user/update/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <div className="page-section">
      <Container>
        <h1 className="mb-4 wow fadeInUp">User Profile</h1>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={profile.firstName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={profile.firstName}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={profile.lastName || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={profile.lastName}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="date"
                    name="dob"
                    value={profile.dob || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Form.Control plaintext readOnly defaultValue={profile.dob} />
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={profile.email}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                {isEditing ? (
                  <Form.Control
                    as="select"
                    name="gender"
                    value={profile.gender || ""}
                    onChange={handleInputChange}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={profile.gender}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formNumber">
                <Form.Label>Number</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    name="number"
                    value={profile.number || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={profile.number}
                  />
                )}
              </Form.Group>

              <div className="mt-4">
                {isEditing ? (
                  <Button
                    variant="primary"
                    onClick={handleSaveClick}
                    className="mr-2"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="info"
                    onClick={handleEditClick}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </Col>
          </Row>

          <div className="text-danger mb-2">{validationError}</div>
        </Form>
      </Container>
    </div>
  );
};

export default UserProfile;
