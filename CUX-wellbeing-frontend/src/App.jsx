import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateMomentPage from './pages/CreateMomentPage';
import UserListPage from './pages/UserListPage';
import AssignMomentPage from './pages/AssignMomentPage';
import CreateUserPage from './pages/CreateUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-moment" element={<CreateMomentPage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/assign-moment" element={<AssignMomentPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
