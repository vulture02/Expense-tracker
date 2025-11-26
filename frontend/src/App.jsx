import React from "react";
import Dashboard from "./pages/Dashboard";
import PublicDashboard from "./pages/PublicDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import GroupDetails from "./pages/GroupDetails";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Checking authentication...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user, loading } = useAuth();

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        
        {/* Public or Private Dashboard depending on user */}
        <Route 
          path="/" 
          element={ user ? <Dashboard /> : <PublicDashboard /> } 
        />

        {/* Protected group page */}
        <Route
          path="/groups/:groupId"
          element={
            <PrivateRoute>
              <GroupDetails />
            </PrivateRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
