import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import ScrollToTop from '@/components/ScrollToTop';

/** Shared shell for every page: header, floating buttons, page content, footer. */
export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <FloatingButtons />
      <Header />
      <main key={pathname} className="pgf">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}