import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import AIRecommendations from './pages/AIRecommendations';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <>
              <Navbar />
              <Dashboard />
            </>
          } />
          <Route path="/add" element={
            <>
              <Navbar />
              <AddEmployee />
            </>
          } />
          <Route path="/ai-insights" element={
            <>
              <Navbar />
              <AIRecommendations />
            </>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
