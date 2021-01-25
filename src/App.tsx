import React from 'react';
import logo from './porsche-vector-logo.svg';
import { Fitment } from './features/fitment/Fitment';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <Fitment />

      </section>
      </div>
      <footer>

      </footer>
    </div>
  );
}

export default App;