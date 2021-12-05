import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import NavBar from './components/Navigation';
import Footer from './components/Footer/indext';
import DashboardController
  from './components/Dashboard/DashboardController';
import Splash from './components/splash';

function App() {
  const [userId, setUserId] = useState<string>('');
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/dashboard' element={<DashboardController/>} />
        <Route path='' element={<Splash userId={userId}/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
