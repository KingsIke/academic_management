import './styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import AIAssistant from './pages/AiAssistant';

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (token: string, role: string, id: string) => {
    setToken(token);
    setRole(role);
    setUserId(id);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', id);
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.clear();
  };

  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

  return (
    <Router>
      <div className="container">
        <Navbar token={token} role={role} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard role={role} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/courses" element={token ? <Courses role={role} userId={userId} /> : <Navigate to="/login" />} />
          <Route path="/assignments" element={token ? <Assignments role={role} userId={userId} /> : <Navigate to="/login" />} />
          <Route path="/ai-assistant" element={token ? <AIAssistant role={role} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;