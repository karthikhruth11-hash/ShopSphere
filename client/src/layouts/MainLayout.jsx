import React from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children, onNavigate, onCartClick }) {
  return (
    <div>
      <Navbar onNavigate={onNavigate} onCartClick={onCartClick} />
      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  );
}