import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from 'pages/Game';
import Menu from 'pages/Menu';
import Leaderboards from 'pages/Leaderboards';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </BrowserRouter>);
}

export default Router;