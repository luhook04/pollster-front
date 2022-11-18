import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { AuthContext } from './context/context';

const App = () => {
  const { state, dispatch } = useContext(AuthContext);

  return <div>{state.isAuthenticated ? <div>homepage</div> : <Login />}</div>;
};

export default App;
