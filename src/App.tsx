import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthContext } from './context/context';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [currentUser, setCurrentUser] = useState<{
    [key: string]: any;
  }>({});

  const { state } = useContext(AuthContext);

  useEffect(() => {
    const getHomeUser = async () => {
      try {
        const req = await fetch(
          `https://pollster-api-production.up.railway.app/api/home`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        const reqJson = await req.json();
        setCurrentUser(reqJson.user);
      } catch (err) {
        return err;
      }
    };
    getHomeUser();
  }, [state, currentUser]);

  return (
    <>
      {state.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={state.isAuthenticated ? <Home /> : <Login />}
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
