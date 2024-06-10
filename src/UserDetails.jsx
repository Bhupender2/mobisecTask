import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Summary from "./Summary";

const UserDetails = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // Extract userData from state
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (userData && userData.user && userData.user.userId) {
      localStorage.setItem("userId", userData.user.userId);
    }
  }, [userData]);

  // Log the userData to see what's being received
  console.log("userData:", userData);

  // Ensure that userData is defined
  if (!userData) {
    return <div>No user data available.</div>;
  }

  // Ensure userData has the expected properties
  const {
    user,
    accessToken,
    refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
  } = userData;

  return (
    <div>
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            Object.entries(user).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{String(value)}</td>
              </tr>
            ))}
          <tr>
            <td>Access Token</td>
            <td>{accessToken}</td>
          </tr>
          <tr>
            <td>Refresh Token</td>
            <td>{refreshToken}</td>
          </tr>
          <tr>
            <td>Issued At</td>
            <td>{new Date(userData.data.issuedAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Access Token Expiry</td>
            <td>
              {new Date(userData.data.accessTokenExpiry).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>Refresh Token Expiry</td>
            <td>{userData.data.refreshTokenExpiry}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setShowSummary(true)}>Show Summary</button>
      {showSummary && <Summary userId={userData.data.user.userId} />}
    </div>
  );
};

export default UserDetails;
