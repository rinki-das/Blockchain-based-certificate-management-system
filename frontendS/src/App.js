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
import Admin from './components/Admin/admin'; // Corrected file name
import Logins from './components/Admin/Logins';
import DataEntry from './components/Admin/DataEntry';
import SignIn from './components/Signin/SignIn';
import Registration from './components/Registration/regpage';
import CertDept from './components/Admin/CertDept'; // Import the Certificate Department dashboard
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Certinum from './components/Admin/certinum';
import Certtable from './components/Admin/certtable';
import DataEdit from './components/Admin/DataEdit';
import NotificationsPage from './components/Admin/NotificationsPage';
import AddCert from './components/Admin/AddCert';
import PrintReportPage from './components/Admin/PrintReportPage'
import StudentStatus from './components/Student/StudentStatus'

export default function App() {
  return (
    <Router>
      <ToastContainer /> {/* Include ToastContainer here */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/regpage" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/logins" element={<Logins />} />
        <Route path="/certdept" element={<CertDept />} />
        <Route path="/certinum" element={<Certinum />} /> 
        <Route path="/certtable" element={<Certtable />} /> 
        <Route path="/Dataedit" element={<DataEdit />} /> 
        <Route path="/notify" element={<NotificationsPage />} />
        <Route path="/add" element={<AddCert />} />
        <Route path="/print" element={<PrintReportPage />} />
       <Route path= "/status" element={< StudentStatus/>} />

      </Routes>
      <Footer />
    </Router>
  );
}





