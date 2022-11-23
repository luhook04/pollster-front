import React, { useContext } from 'react';
import './App.css';
import Login from './components/Login';
import { AuthContext } from './context/context';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      {state.isAuthenticated ? <Home /> : <Login />}
    </BrowserRouter>
  );
};

export default App;
