import React, { useState } from 'react';
import './App.css';
import Main from './main';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Main toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} /> 
      </Router>
    </div>
  );
}

export default App;
