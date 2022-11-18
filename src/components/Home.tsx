import React, { useContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/context';
import Nav from './Nav';

const Home = () => {
  const { state } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      {state.isAuthenticated && <Nav />}
      <Routes>
        <Route path="/" element={<div>cool</div>}></Route>
        <Route path="/newpoll" element={<div>create poll</div>}></Route>
        <Route path="/users/:userId" element={<div>view account</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
