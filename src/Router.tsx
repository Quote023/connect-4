import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from 'pages/Game';

const Router: React.FC = () => {
  return ( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Game />}/>
    </Routes>
  </BrowserRouter>);
}

export default Router;