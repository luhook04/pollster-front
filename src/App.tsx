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
  const [createPollForm, setCreatePollForm] = useState<boolean>(false);
  const closeForm = (): void => {
    setCreatePollForm(false);
  };

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
  }, [state]);

  return (
    <div className="app" onClick={closeForm}>
      {state.isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            state.isAuthenticated ? (
              <Home
                createPollForm={createPollForm}
                setCreatePollForm={setCreatePollForm}
                currentUser={currentUser}
              />
            ) : (
              <Login />
            )
          }
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
    </div>
  );
};

export default App;
