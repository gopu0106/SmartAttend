import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import StudentDashboard from './pages/StudentDashboard';
import FacultyAttendance from './pages/FacultyAttendance';
import MessTerminal from './pages/MessTerminal';
import AdminPanel from './pages/AdminPanel';
import QRScanner from './pages/QRScanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import PendingApproval from './pages/PendingApproval';
import AppShell from './components/layout/AppShell';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (no navigation header) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pending-approval" element={<PendingApproval />} />

        {/* Demo Routes (public, read-only previews) */}
        <Route path="/demo/student" element={<StudentDashboard demoMode={true} />} />
        <Route path="/demo/faculty" element={<FacultyAttendance demoMode={true} />} />
        <Route path="/demo/mess" element={<MessTerminal demoMode={true} />} />
        <Route path="/demo/admin" element={<AdminPanel demoMode={true} />} />

        {/* Protected Routes (with navigation header) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell>
                <StudentDashboard />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <ProtectedRoute>
              <AppShell>
                <FacultyAttendance />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mess"
          element={
            <ProtectedRoute>
              <AppShell>
                <MessTerminal />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AppShell>
                <AdminPanel />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/qr-scan"
          element={
            <ProtectedRoute>
              <AppShell>
                <QRScanner />
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
