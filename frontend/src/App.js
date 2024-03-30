import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Display from './components/Display';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Notification from './components/Notification';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Display />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/notification" element={<Notification/>} />
          <Route path='/mycourses/:id' element={<CourseDetail/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
