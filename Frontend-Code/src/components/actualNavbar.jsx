import React from "react";

import Navbar from "./header";
import MyNavbar from "./patientNavbar";
import AdminNavbar from "./adminsNavbar";
import DoctorNavbar from "./doctorNavbar";

const MainComponent = () => {
  // Retrieve token from local storage
  const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with your actual token key

  // Retrieve role from local storage or your authentication logic
  const role = localStorage.getItem("role"); // Replace 'yourRoleKey' with your actual role key

  // Check if token is empty
  if (!token) {
    return <Navbar />;
  }

  // Check the role and render the corresponding Navbar
  if (role === "PATIENT") {
    return <MyNavbar />;
  } else if (role === "ADMIN") {
    return <AdminNavbar />;
  } else if (role === "DOCTOR") {
    return <DoctorNavbar />;
  } else {
    // Default case (you can handle other roles as needed)
    return <Navbar />;
  }
};

export default MainComponent;
