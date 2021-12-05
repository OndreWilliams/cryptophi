import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NavBar from './components/Navigation';
import Footer from './components/Footer/indext';
import DashboardController
  from './components/Dashboard/DashboardController';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<DashboardController/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
