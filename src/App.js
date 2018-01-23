import logo from './logo.svg';
import './App.css';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checker from './Checker.js';

const App = () => (
  <MuiThemeProvider>
    <Checker />
  </MuiThemeProvider>
);

export default App;
