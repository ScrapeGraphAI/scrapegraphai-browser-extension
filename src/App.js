import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header.js';
import Home from './views/Home.js';
import Settings from './views/Settings.js';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
