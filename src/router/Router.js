import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Questions from '../pages/Questions';
import Final from '../pages/Final';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='final' element={<Final />} />
      <Route path='questions' element={<Questions />} />
    </Routes>
  );
};

export default Router;
