import React from 'react';
import Header from './Header';
import './App.css';
import PortfolioControl from './PortfolioControl';
import SignIn from './SignIn';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
    <Header />
    <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<PortfolioControl />} />
      </Routes>
    </Router>
  );
}

export default App;
