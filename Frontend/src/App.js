import React, { useState } from "react";
import './App.css';
import Home from './Home';
import Information from './Information';
import Help from './Help';
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
          <Route path='/info' element={<Information prediction={prediction} description={matching_info} />} />

          <Route path='/help' element={<Help />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
