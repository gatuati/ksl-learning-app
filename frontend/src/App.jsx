"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Learn from "./components/Learn/Learn";
import Unit1 from "./components/Learn/Unit1";
import Unit2 from "./components/Learn/Unit2";
import Unit3 from "./components/Learn/Unit3";
import Quiz from "./components/Quiz/Quiz";
import AskAI from "./components/AskAI/AskAI";
import Profile from "./components/Profile/Profile";
import ProtectedAdminRoute from "./components/protectedAdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import VideoPlayer from "./components/Learn/VideoPlayer";
import "./App.css";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route
  path="/dashboard"
  element={
    user ? (
      user.isAdmin ? <Navigate to="/admin" /> : <Dashboard />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

      <Route path="/learn" element={user ? <Learn /> : <Navigate to="/login" />} />
      <Route path="/learn/unit1" element={user ? <Unit1 /> : <Navigate to="/login" />} />
      <Route path="/learn/unit2" element={user ? <Unit2 /> : <Navigate to="/login" />} />
      <Route path="/learn/unit3" element={user ? <Unit3 /> : <Navigate to="/login" />} />
      <Route path="/quiz" element={user ? <Quiz /> : <Navigate to="/login" />} />
      <Route path="/ask-ai" element={user ? <AskAI /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

      {/* ✅ Use the ProtectedAdminRoute here */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      <Route path="/video/:id" element={<VideoPlayer />} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
