import React, { useContext } from 'react';
import './App.css';
import Login from './components/Login';
import { AuthContext } from './context/context';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <>
      {state.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={state.isAuthenticated ? <div>homepage/feed</div> : <Login />}
        ></Route>
        <Route
          path="/newpoll"
          element={state.isAuthenticated ? <div>create poll</div> : <Login />}
        ></Route>
        <Route
          path="/users/:userId"
          element={state.isAuthenticated ? <div>About</div> : <Login />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
