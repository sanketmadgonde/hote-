import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Componets/Login';
import Dashboard from './Componets/Dashboard';
import Landing from './Componets/Landing'
import StartersMenu from './Componets/StarterMenu';
import DessertsMenu from './Componets/DessertsMenu';
import DrinksMenu from './Componets/DrinksMenu';

import CelebrationSpecial from './Componets/CelebrationSpecial';
import MainCourseMenu from './Componets/MainCourseMenu';
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/Starters/menu" element={<StartersMenu/>} />
        <Route path="/Desserts/menu"  element={<DessertsMenu/>} />
        <Route path="/Drinks/menu"  element={<DrinksMenu/>} />
        <Route path="/Main Course/menu"  element={<MainCourseMenu/>} />
        <Route path="/Celebration Special/menu"  element={<CelebrationSpecial/>} />
      </Routes>
    </Router>
  );
}

export default App;



