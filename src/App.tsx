import React from 'react';
import './App.css';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/context';
import Login from './components/Login';

const App = () => {
  return (
    <AuthProvider>
      <Login></Login>
    </AuthProvider>
  );
};

export default App;
