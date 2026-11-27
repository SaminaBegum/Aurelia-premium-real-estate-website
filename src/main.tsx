import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { SavedProvider } from '@/contexts/SavedContext';
import './index.css';
import './App.css';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <SavedProvider>
            <App />
        </SavedProvider>
    </HashRouter>,
);