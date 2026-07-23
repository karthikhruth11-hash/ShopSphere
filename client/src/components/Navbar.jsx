import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export default function Navbar({ onNavigate, onCartClick, onSelectCategory, onBack }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const categories = [
    { label: '🔥 Trending', value: 'Trending' },
    { label: '💄 Cosmetics', value: 'Cosmetics' },
    { label: '👧 Girls Section', value: 'Girls' },
    { label: '👦 Boys Section', value: 'Boys' },
    { label: '🏷️ Offers', value: 'Offers' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#0f172a',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Brand Logo & Global Nav Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Brand Logo */}
          <div 
            onClick={() => {
              onNavigate && onNavigate('home');
              onSelectCategory && onSelectCategory('All');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#fff'
            }}>
              S
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              Shop<span style={{ color: '#ec4899' }}>Sphere</span>
            </span>
          </div>

          {/* Explicit Back & Home Navigation Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <button
              onClick={() => onBack ? onBack() : (onNavigate && onNavigate('home'))}
              title="Go Back"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s'
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => {
                onNavigate && onNavigate('home');
                onSelectCategory && onSelectCategory('All');
              }}
              title="Go to Home"
              style={{
                background: 'rgba(37, 99, 235, 0.25)',
                border: '1px solid rgba(37, 99, 235, 0.4)',
                color: '#ffffff',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s'
              }}
            >
              🏠 Home
            </button>
          </div>
        </div>

        {/* Collection Quick Navigation */}
        <nav style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                onNavigate && onNavigate('home');
                onSelectCategory && onSelectCategory(cat.value);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                padding: '0.4rem 0.65rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* User & Cart Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={onCartClick}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              border: 'none',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}
          >
            <span>🛒 Cart</span>
            <span style={{
              background: '#ec4899',
              color: '#fff',
              borderRadius: '9999px',
              padding: '0.1rem 0.45rem',
              fontSize: '0.78rem'
            }}>
              {cartCount}
            </span>
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>👋 {user.name}</span>
              <button 
                onClick={logout} 
                style={{ padding: '0.4rem 0.75rem', cursor: 'pointer', borderRadius: '6px', border: 'none', background: '#ef4444', color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate && onNavigate('login')} 
              style={{ padding: '0.45rem 0.9rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}