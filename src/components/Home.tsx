import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Home = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<div>cool</div>}></Route>
        <Route path="/newpoll" element={<div>create poll</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
