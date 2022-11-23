import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/context';
import Login from './Login';
import Nav from './Nav';

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      {state.isAuthenticated && <Nav />}
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
    </BrowserRouter>
  );
};

export default Home;
