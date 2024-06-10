import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ userData }) => {
  const [windowsData, setWindowsData] = useState(null);

  // Retrieve userData from localStorage if not passed as prop
  const localStorageUserData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.data?.user?.userId || localStorageUserData?.data?.user?.userId || "";
  const token = userData?.data?.accessToken || localStorageUserData?.data?.accessToken || "";

  useEffect(() => {
    async function fetchData() {
      if (!userId || !token) {
        console.error("Missing userId or token");
        return;
      }
      try {
        const response = await axios.get(
          `https://dev.cyberauditor.in/api/v1/summary/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [userId, token]);

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
