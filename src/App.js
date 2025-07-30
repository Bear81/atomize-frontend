import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LogsPage from './pages/LogsPage';
import HomePage from './pages/HomePage';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/habits"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/logs"
          element={
            <RequireAuth>
              <LogsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
