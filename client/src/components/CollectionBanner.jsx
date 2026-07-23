import React from 'react';

export default function CollectionBanner({ onSelectCategory }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e293b 100%)',
      borderRadius: '16px',
      padding: '2.5rem 2rem',
      color: '#ffffff',
      marginBottom: '2.5rem',
      boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Blur Circles */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '240px',
        height: '240px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '20%',
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
        <span style={{
          background: 'rgba(236, 72, 153, 0.2)',
          color: '#f472b6',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          padding: '0.3rem 0.8rem',
          borderRadius: '9999px',
          fontSize: '0.82rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          display: 'inline-block',
          marginBottom: '1rem'
        }}>
          ✨ New Season Collections 2026
        </span>

        <h1 style={{
          fontSize: '2.6rem',
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: '0.8rem',
          background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Discover Fashion, Cosmetics & Trends
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '1.8rem', lineHeight: 1.6 }}>
          Shop curated collections for <strong>Trending Gadgets</strong>, <strong>Organic Cosmetics</strong>, and adorable <strong>Dresses & Outfits for Girls and Boys</strong> with up to 30% off!
        </p>

        {/* Quick CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSelectCategory && onSelectCategory('Trending')}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            🔥 Shop Trending
          </button>
          <button
            onClick={() => onSelectCategory && onSelectCategory('Cosmetics')}
            style={{
              background: '#ec4899',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.35)',
              transition: 'all 0.2s'
            }}
          >
            💄 Cosmetics
          </button>
          <button
            onClick={() => onSelectCategory && onSelectCategory('Girls')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s'
            }}
          >
            👧 Girls Section
          </button>
          <button
            onClick={() => onSelectCategory && onSelectCategory('Boys')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '0.75rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s'
            }}
          >
            👦 Boys Section
          </button>
        </div>
      </div>
    </div>
  );
}
