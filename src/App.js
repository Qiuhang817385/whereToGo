import React from 'react';
import logo from './logo.svg';
import './App.css';
import As from './component/As'
import { Button } from 'antd';
function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary">123</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <As></As>
        </a>
      </header>
    </div>
  );
}

export default App;
