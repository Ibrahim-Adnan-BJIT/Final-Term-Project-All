import React, { useEffect, useState } from "react";

const HealthStateDisplay = () => {
  const [healthTrackData, setHealthTrackData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8091/api/healthdata/getHealthTrack",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setHealthTrackData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const getEmojiForState = (state) => {
    switch (state) {
      case "CONSULT_A_DOCTOR":
        return "👩‍⚕️";
      case "VERY_POOR":
        return "😓";
      case "POOR":
        return "😕";
      case "NORMAL":
        return "😊";
      case "GOOD":
        return "😃";
      case "VERY_GOOD":
        return "🌟";
      default:
        return "";
    }
  };

  return (
    <div className="container mt-4">
      <h2>Patient's Health Track</h2>
      {healthTrackData.map((entry, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <p className="card-text">Date: {entry.date}</p>
            {index === healthTrackData.length - 1 ? (
              <p className="card-text font-weight-bold text-primary">
                Current State: {entry.state}
              </p>
            ) : (
              <p className="card-text text-secondary">
                Previous State: {entry.state}
              </p>
            )}
            <p className="card-text">{getEmojiForState(entry.state)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthStateDisplay;
