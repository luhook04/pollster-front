import React, { useContext } from 'react';
import './App.css';
import Login from './components/Login';
import { AuthContext } from './context/context';
import Home from './components/Home';

const App = () => {
  const { state } = useContext(AuthContext);

  return <div>{state.isAuthenticated ? <Home /> : <Login />}</div>;
};

export default App;
