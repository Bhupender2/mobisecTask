import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import UserDetails from './UserDetails';
import Summary from './Summary';

const App = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
