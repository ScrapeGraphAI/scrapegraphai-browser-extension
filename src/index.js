import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.js'
import { MemoryRouter } from 'react-router-dom';
import './assets/css/style.css'

const root = createRoot(document.getElementById('root'));
root.render(
    <MemoryRouter>
        <App />
    </MemoryRouter>
)
