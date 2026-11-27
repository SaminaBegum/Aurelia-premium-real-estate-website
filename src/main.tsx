import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { SavedProvider } from '@/contexts/SavedContext';
import { LocationProvider } from '@/contexts/LocationContext';
import './index.css';
import './App.css';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <LocationProvider>
            <SavedProvider>
                <App />
            </SavedProvider>
        </LocationProvider>
    </HashRouter>,
);