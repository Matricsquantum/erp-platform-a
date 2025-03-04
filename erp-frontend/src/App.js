import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Temporarily disable fetch for deployment (fix later)
    // fetch('http://localhost:8000/')
    //   .then(response => response.json())
    //   .then(data => setMessage(data.message))
    //   .catch(error => setMessage('Error: ' + error.message));
    setMessage('ERP Frontend Deployed - Backend Coming Soon');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;