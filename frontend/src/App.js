import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Courses from './components/Courses';
import Success from './components/Success';
import Cancel from './components/Cancel';
import MyCourses from './components/MyCourses';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/mycourses" element={<MyCourses/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
