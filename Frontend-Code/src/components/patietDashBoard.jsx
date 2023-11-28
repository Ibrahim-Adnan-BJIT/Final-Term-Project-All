import React, { useEffect, useState } from "react";
import CommunitySection from "./communityPage";
import DoctorList from "./doctorList";
import DoctorRegistrationMessage from "./allocateDoctor";
import AllocateResource from "./allocateResource";
import AllocateMedicine from "./allocateMedicine";
import ManageSlots from "./manageSlots";

const Dashboard = () => {
  // State to store the user's role
  const [role, setRole] = useState("");

  // Effect to retrieve the user's role from local storage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Background image style
  const backgroundImageStyle = {
    backgroundImage: `url('https://img.freepik.com/free-vector/gradient-technological-background_23-2148884155.jpg?w=740&t=st=1701164773~exp=1701165373~hmac=c91733371c4bb5dfa6bcbccb2abc2b862b9eb78ae1218ec9c7aff93f0e79dae0')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Adjust this as needed
  };

  return (
    <div style={backgroundImageStyle}>
      <>
        <br />
        {role === "ADMIN" && (
          <>
            <CommunitySection />
            <br />
            <DoctorRegistrationMessage />
            <br />
            <AllocateResource />
            <br />
            <AllocateMedicine />
            <br />
          </>
        )}
        {role === "PATIENT" && (
          <>
            <CommunitySection />
            <br />
            <DoctorList />
            <br />
          </>
        )}
        {role === "DOCTOR" && (
          <>
            <CommunitySection />
            <br />
            <ManageSlots />
            <br />
          </>
        )}
      </>
    </div>
  );
};

export default Dashboard;
