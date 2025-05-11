import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TalentSearch from './pages/TalentSearch';
import Meeting from './pages/Meeting';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  color: black;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<TalentSearch />} />
          <Route path="/meeting/:id" element={<Meeting />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App; 