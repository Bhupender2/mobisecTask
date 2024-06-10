import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserDetails from "./UserDetails";
import Summary from "./Summary";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});

  const [userId, setUserId] = useState(userData?.data?.user?.userId || "");

  const [token, setToken] = useState(userData?.data?.accessToken || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dev.cyberauditor.in/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setMessage("Login successful!");
        // Extracting response data and passing it to UserDetails page
        setUserData(response.data); //due to async nature of react and react batched the state for performance
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/user-details", { state: { userData: response.data } });
      }
    } catch (error) {
      setMessage("Login failed. Please check your credentials and try again.");
    }
  };
  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
  return (
    <div>
      <h1>Welcome to My App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              message={message}
              onHandleSubmit={handleSubmit}
            />
          }
        />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/summary" element={<Summary userData={userData} />} />
      </Routes>
    </div>
  );
};

export default App;
