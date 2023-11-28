import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const BMIChart = () => {
  const [bmiData, setBmiData] = useState([]);
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
          throw new Error("Failed to fetch BMI data");
        }

        const data = await response.json();
        // Extract BMI values from the data
        const bmiValues = data.map((entry) => entry.bmi);
        setBmiData(bmiValues);
      } catch (error) {
        console.error("Error fetching BMI data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Prepare data for Google Chart
  const chartData = [
    ["Index", "BMI"],
    ...bmiData.map((bmi, index) => [index + 1, bmi]),
  ];

  // Options for the Google Line Chart
  const chartOptions = {
    title: "BMI Chart",
    hAxis: { title: "Index" },
    vAxis: { title: "BMI" },
    pointSize: 5, // Add this line to specify the size of the points
  };

  return (
    <div className="container mt-4">
      <h2>BMI Chart</h2>

      {/* Display Google Line Chart */}
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="Line"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={chartOptions}
        legendToggle
      />
    </div>
  );
};

export default BMIChart;
