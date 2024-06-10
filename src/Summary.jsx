import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ userId }) => {
  const [windowsData, setWindowsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://dev.cyberauditor.in/api/v1/summary/${userId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0YTJhZjhhOWIxZTFjN2U2YWViYTYiLCJyb2xlIjoiU3VwZXIgQWRtaW4iLCJvcmdhbmlzYXRpb24iOiJtb2Jpc2VjIHRlY2hub2xvZ2llcyBwdnQuIGx0ZCIsImRlcGFydG1lbnQiOiIiLCJpYXQiOjE3MTgwMDM5OTAsImV4cCI6MTcxODA5MDM5MH0.0QLqj2fZydZ2QGRvU85WDCX5qwCJtxeaLdDxkbTtcX0",
            },
          }
        );
        const { windows } = response.data;
        setWindowsData(windows);
        console.log(windows);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    }
    fetchData();
  }, [userId]);

  // Function to safely render values
  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div>
      <h2>Windows Summary</h2>
      {windowsData ? (
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(windowsData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{renderValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading summary data...</p>
      )}
    </div>
  );
};

export default Summary;
