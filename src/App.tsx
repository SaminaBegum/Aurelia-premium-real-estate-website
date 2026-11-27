import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import PropertyManagement from '@/pages/PropertyManagement';
import About from '@/pages/About';
import Team from '@/pages/Team';
import ListProperty from '@/pages/ListProperty';
import Careers from '@/pages/Careers';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Developers from '@/pages/Developers';
import Invest from '@/pages/Invest';
import Insights from '@/pages/Insights';
import Saved from '@/pages/Saved';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/exclusive-projects" element={<Projects />} />
        <Route path="/exclusive-projects/:id" element={<ProjectDetail />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/list-your-property" element={<ListProperty />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}