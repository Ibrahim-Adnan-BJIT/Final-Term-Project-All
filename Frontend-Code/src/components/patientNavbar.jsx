import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8081/api/v2/getNotificationForPatient",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");

      // Change patient status based on notificationId
      await fetch(
        `http://localhost:8081/api/v2/changePatientStatus/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the clicked notification from the list
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();

    // Navigate to the homepage
    navigate("/");
  };

  const handleSeeAppointments = () => {
    // Navigate to the see-appointments page
    navigate("/see-appointments");
  };

  const handleProfile = () => {
    // Navigate to the profile page
    navigate("/profile");
  };
  const handleHealthData = () => {
    // Navigate to the profile page
    navigate("/health-data");
  };
  const handleRecommendation = () => {
    // Navigate to the profile page
    navigate("/recommendation");
  };
  const handletrack = () => {
    // Navigate to the profile page
    navigate("/create-track");
  };
  const handleIncomplteteTrack = () => {
    // Navigate to the profile page
    navigate("/incomplete-track");
  };
  const handleCompletedProgress = () => {
    // Navigate to the profile page
    navigate("/complete-track");
  };
  const handleHealthTrack = () => {
    // Navigate to the profile page
    navigate("/health-track");
  };
  const handleMedicineList = () => {
    // Navigate to the profile page
    navigate("/medicine-list");
  };

  const handleBmiList = () => {
    // Navigate to the profile page
    navigate("/bmi-list");
  };
  return (
    <Navbar bg="light" variant="dark" expand="lg" className="text-center">
      <Container fluid>
        <NavDropdown
          title={
            <span>
              <FontAwesomeIcon icon={faBars} className="mr-1" /> Menu
            </span>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleSeeAppointments}>
            See Appointments
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleHealthData}>
            Health Data
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleRecommendation}>
            Recommendations
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handletrack}>
            Track a Progress
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleIncomplteteTrack}>
            Incomplete Progress
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleCompletedProgress}>
            Completed Progress
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleHealthTrack}>
            Health Track
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleMedicineList}>
            View Medicines
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleBmiList}>
            Health Condition
          </NavDropdown.Item>
        </NavDropdown>

        {/* Notification Bell Icon */}
        <Nav.Item className="ml-auto">
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faBell} />
                {notifications.length > 0 && (
                  <span className="notification-alert"></span>
                )}
              </>
            }
            id="notificationDropdown"
          >
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <NavDropdown.Item
                    key={notification.notificationId}
                    onClick={() =>
                      handleNotificationClick(notification.notificationId)
                    }
                  >
                    {notification.message}
                  </NavDropdown.Item>
                ))}
              </>
            ) : (
              <NavDropdown.Item disabled>No new notifications</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav.Item>

        {/* Wrap the title inside a Link */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="h1" style={{ marginLeft: "38px" }}>
            Expo Health Management System
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarToggleExternalContent" />
        <Navbar.Collapse
          id="navbarToggleExternalContent"
          className="justify-content-end"
        >
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button
              variant="outline-dark"
              className="mr-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
