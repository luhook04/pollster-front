import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/context';
import Login from './Login';
import Header from './Header';

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <div>
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
          element={state.isAuthenticated ? <div>view account</div> : <Login />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
