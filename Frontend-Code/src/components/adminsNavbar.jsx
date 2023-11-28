import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();

    // Navigate to the homepage
    navigate("/");
  };

  const handleProfile = () => {
    // Navigate to the profile page
    navigate("/profile");
  };

  const handleMedicineList = () => {
    // Navigate to the profile page
    navigate("/medicine-list");
  };
  const handleAppointmentList = () => {
    // Navigate to the profile page
    navigate("/seeappointment-list");
  };
  const handleUserList = () => {
    // Navigate to the profile page
    navigate("/user-list");
  };
  const handleResearchData = () => {
    // Navigate to the profile page
    navigate("/research-data");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="text-center">
      <Container fluid>
        <NavDropdown
          title={
            <span>
              <FontAwesomeIcon icon={faBars} className="mr-1" /> Menu
            </span>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>

          <NavDropdown.Item onClick={handleMedicineList}>
            View Medicines
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleAppointmentList}>
            See All Appointments
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleUserList}>
            See All Users
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleResearchData}>
            Health Data
          </NavDropdown.Item>
        </NavDropdown>

        {/* Wrap the title inside a Link */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Navbar.Brand
            as="h1"
            style={{ marginLeft: "38px", color: "#f8f9fa" }}
          >
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

export default AdminNavbar;
