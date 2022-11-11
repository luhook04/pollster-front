import React from 'react';
import './App.css';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/context';

const App = () => {
  return <AuthProvider></AuthProvider>;
};

export default App;
