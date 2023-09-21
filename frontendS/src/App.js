import React from 'react';
import './App.css';
import Header from './components/common/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Team from './components/team/Team';
import Contact from './components/contact/Contact';
import Footer from './components/common/footer/Footer';
import Home from './components/home/Home';
import Admin from './components/Admin/admin';
import SignIn from './components/Signin/SignIn';
import Registration from './components/Registration/regpage'
import Admindashboard from './components/Admin/admindashboard'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/regpage" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/admindashboard" element={<Admindashboard/>} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

