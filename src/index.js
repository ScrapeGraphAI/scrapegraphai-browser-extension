import React from 'react';
import { createRoot } from 'react-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Home from './views/Home.jsx';
import Settings from './views/Settings.jsx';

import './assets/css/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <MemoryRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </MemoryRouter>
);
