import React, { useState } from "react";
import './App.css';
import Home from './Home';
import HomeLogin from "./HomeLogin";
import Information from './Information';
import Help from './Help';
import Login from "./Login";
import InformationLogin from "./InformationLogin"
import RegistrationForm from "./RegistrationForm";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar'; 

function App() {
  const [prediction, setPrediction] = useState(""); 
  const [matching_info, setMatchingInfo] = useState("");
  return (
    <div>
      <Router>
        <NavigationBar /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<HomeLogin/>} />
          <Route path='/info' element={<Information prediction={prediction} description={matching_info} />} />
          <Route path='/infologin' element={<InformationLogin prediction={prediction} description={matching_info} />} />
          <Route path='/login' element={<Login/>} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path='/help' element={<Help />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
