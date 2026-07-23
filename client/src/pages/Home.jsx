import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import CollectionBanner from '../components/CollectionBanner';

// High-quality fallback items for all collections
const FALLBACK_PRODUCTS = [
  // Trending
  {
    _id: 'fb-t1',
    name: 'Active Noise-Cancelling Wireless Headphones',
    price: 129.99,
    description: 'Immersive spatial audio with 40h battery life and sleek ergonomic cushion design.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    category: 'Trending',
    rating: 4.9,
    numReviews: 128
  },
  {
    _id: 'fb-t2',
    name: 'Smart OLED Fitness & Wellness Tracker',
    price: 69.99,
    description: 'Real-time heart rate monitoring, sleep analysis, and water resistance up to 50m.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: 'Trending',
    rating: 4.8,
    numReviews: 95
  },
  {
    _id: 'fb-t3',
    name: 'Minimalist Leather Smartwatch',
    price: 149.00,
    description: 'Premium Italian leather strap with touch display and wireless charging dock.',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600',
    category: 'Trending',
    rating: 4.7,
    numReviews: 64
  },

  // Cosmetics
  {
    _id: 'fb-c1',
    name: 'Velvet Matte Liquid Lipstick Trio Set',
    price: 28.99,
    description: 'Long-lasting 24h waterproof formula in nude, rose, and classic crimson shades.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
    category: 'Cosmetics',
    rating: 4.9,
    numReviews: 210
  },
  {
    _id: 'fb-c2',
    name: 'Botanical Hyaluronic Glow Facial Serum',
    price: 38.50,
    description: 'Organic vitamin C & rosehip infusion for intense hydration and radiant skin.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
    category: 'Cosmetics',
    rating: 4.9,
    numReviews: 175
  },
  {
    _id: 'fb-c3',
    name: 'Rose Gold Shimmer Eyeshadow Palette',
    price: 32.00,
    description: '16 high-pigment matte and metallic shades for versatile day & night looks.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600',
    category: 'Cosmetics',
    rating: 4.8,
    numReviews: 88
  },
  {
    _id: 'fb-c4',
    name: 'Luminous Silk Hydrating Foundation',
    price: 42.00,
    description: 'Lightweight buildable medium coverage foundation with SPF 20 protection.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    category: 'Cosmetics',
    rating: 4.7,
    numReviews: 140
  },

  // Girls Section
  {
    _id: 'fb-g1',
    name: 'Girls Floral Summer Chiffon Dress',
    price: 44.99,
    description: 'Beautiful tier-layered floral party dress with lightweight breathable cotton lining.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
    category: 'Girls',
    rating: 4.9,
    numReviews: 54
  },
  {
    _id: 'fb-g2',
    name: 'Girls Vintage Denim Jacket & Tutu Dress',
    price: 49.99,
    description: 'Stylish washed denim jacket paired with a soft tulle princess skirt.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600',
    category: 'Girls',
    rating: 4.8,
    numReviews: 76
  },
  {
    _id: 'fb-g3',
    name: 'Girls Pastel Rainbow Party Gown',
    price: 54.00,
    description: 'Enchanting sleeveless formal gown with satin ribbon waist accent.',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',
    category: 'Girls',
    rating: 5.0,
    numReviews: 42
  },
  {
    _id: 'fb-g4',
    name: 'Girls Soft Knit Cardigan & Skirt Set',
    price: 36.50,
    description: 'Cozy two-piece winter outfit made from ultra-soft hypoallergenic yarn.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600',
    category: 'Girls',
    rating: 4.7,
    numReviews: 31
  },

  // Boys Section
  {
    _id: 'fb-b1',
    name: 'Boys Classic Cotton Flannel Checkered Shirt',
    price: 29.99,
    description: '100% combed cotton button-down shirt designed for everyday comfort.',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600',
    category: 'Boys',
    rating: 4.8,
    numReviews: 62
  },
  {
    _id: 'fb-b2',
    name: 'Boys Streetwear Fleece Graphic Hoodie',
    price: 34.99,
    description: 'Warm fleece-lined hooded sweatshirt featuring modern urban chest graphic.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600',
    category: 'Boys',
    rating: 4.9,
    numReviews: 89
  },
  {
    _id: 'fb-b3',
    name: 'Boys Smart Formal Tuxedo Suit Set',
    price: 69.99,
    description: 'Tailored 3-piece tuxedo set with blazer, vest, and matching trousers for events.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    category: 'Boys',
    rating: 4.9,
    numReviews: 48
  },
  {
    _id: 'fb-b4',
    name: 'Boys Urban Cargo Denim Jeans',
    price: 32.00,
    description: 'Durable stretch denim pants with multi-pocket utility styling.',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600',
    category: 'Boys',
    rating: 4.7,
    numReviews: 50
  },

  // Offers
  {
    _id: 'fb-o1',
    name: 'Classic Velvet Evening Gown (20% OFF)',
    price: 88.00,
    description: 'Luxurious royal blue velvet gown ideal for special celebrations.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600',
    category: 'Offers',
    rating: 4.9,
    numReviews: 110
  },
  {
    _id: 'fb-o2',
    name: 'Designer Sunglasses & Case Bundle',
    price: 39.99,
    description: 'UV400 polarized lenses with hard shell protective travel case.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    category: 'Offers',
    rating: 4.6,
    numReviews: 73
  }
];

export default function Home({ selectedCategory = 'All', setSelectedCategory }) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products?keyword=${activeQuery}`);
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err) {
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveQuery(search);
  };

  const categories = [
    { name: 'All', icon: '🛍️' },
    { name: 'Trending', icon: '🔥' },
    { name: 'Cosmetics', icon: '💄' },
    { name: 'Girls', icon: '👧' },
    { name: 'Boys', icon: '👦' },
    { name: 'Offers', icon: '🏷️' }
  ];

  const getCategoryCount = (catName) => {
    if (catName === 'All') return products.length;
    return products.filter((p) => p.category?.toLowerCase() === catName.toLowerCase()).length;
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const query = activeQuery || search;
    const matchesSearch =
      !query ||
      p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderCategorySection = (title, icon, categoryKey) => {
    const items = products.filter(
      (p) => p.category?.toLowerCase() === categoryKey.toLowerCase()
    );

    if (items.length === 0) return null;

    return (
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-header">
          <div className="section-title">
            <span>{icon}</span> {title}
          </div>
          <button
            onClick={() => setSelectedCategory && setSelectedCategory(categoryKey)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            Explore All ({items.length}) →
          </button>
        </div>

        <div className="products-grid">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="app-container" style={{ paddingTop: '1.5rem' }}>
      {/* Top Navigation Toolbar with Back & Home Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.2rem',
        padding: '0.6rem 1rem',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => {
              if (selectedCategory !== 'All') {
                setSelectedCategory('All');
              } else if (search || activeQuery) {
                setSearch('');
                setActiveQuery('');
              }
            }}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#334155'
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearch('');
              setActiveQuery('');
            }}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            🏠 Home
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>
          Current Collection: <span style={{ color: '#0f172a', fontWeight: 700 }}>{selectedCategory}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <CollectionBanner onSelectCategory={(cat) => setSelectedCategory && setSelectedCategory(cat)} />

      {/* Visual Collection Spotlight Cards */}
      {selectedCategory === 'All' && !search && !activeQuery && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.2rem', color: '#0f172a' }}>
            ✨ Featured Collection Spotlight
          </h2>
          <div className="collections-grid">
            <div
              className="collection-card"
              onClick={() => setSelectedCategory && setSelectedCategory('Trending')}
            >
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" alt="Trending" />
              <div className="collection-card-overlay">
                <span className="collection-card-badge">Hot Deals</span>
                <div className="collection-card-title">🔥 Trending Items</div>
                <div className="collection-card-sub">
                  <span>Smart gadgets & tech</span>
                  <span>Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="collection-card"
              onClick={() => setSelectedCategory && setSelectedCategory('Cosmetics')}
            >
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600" alt="Cosmetics" />
              <div className="collection-card-overlay">
                <span className="collection-card-badge" style={{ background: '#ec4899' }}>Beauty & Glow</span>
                <div className="collection-card-title">💄 Cosmetics & Makeup</div>
                <div className="collection-card-sub">
                  <span>Skincare, serums & lipsticks</span>
                  <span>Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="collection-card"
              onClick={() => setSelectedCategory && setSelectedCategory('Girls')}
            >
              <img src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600" alt="Girls Section" />
              <div className="collection-card-overlay">
                <span className="collection-card-badge" style={{ background: '#8b5cf6' }}>Cute Styles</span>
                <div className="collection-card-title">👧 Girls Collection</div>
                <div className="collection-card-sub">
                  <span>Dresses, gowns & outfits</span>
                  <span>Explore →</span>
                </div>
              </div>
            </div>

            <div
              className="collection-card"
              onClick={() => setSelectedCategory && setSelectedCategory('Boys')}
            >
              <img src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600" alt="Boys Section" />
              <div className="collection-card-overlay">
                <span className="collection-card-badge" style={{ background: '#06b6d4' }}>Cool Wear</span>
                <div className="collection-card-title">👦 Boys Collection</div>
                <div className="collection-card-sub">
                  <span>Shirts, hoodies & suits</span>
                  <span>Explore →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Input Bar with Enter Button */}
      <div style={{
        background: '#ffffff',
        padding: '1.25rem',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        marginBottom: '2.5rem'
      }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.2rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search across Trending, Cosmetics, Girls' & Boys' Collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '1rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveQuery('');
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem 1.6rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
              whiteSpace: 'nowrap'
            }}
          >
            Enter ↵
          </button>
        </form>

        {/* Category Pill Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            const count = getCategoryCount(cat.name);
            return (
              <button
                key={cat.name}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory && setSelectedCategory(cat.name)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Header */}
      {(selectedCategory !== 'All' || activeQuery || search) && (
        <div style={{ marginBottom: '1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              {selectedCategory !== 'All' ? `${selectedCategory} Collection` : 'Search Results'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Showing {filteredProducts.length} items
              {(activeQuery || search) && ` matching "${activeQuery || search}"`}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory && setSelectedCategory('All');
              setSearch('');
              setActiveQuery('');
            }}
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#475569'
            }}
          >
            Reset Filters ↺
          </button>
        </div>
      )}

      {/* Main Grid View */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⌛</div>
          <p>Loading ShopSphere collections...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>No products found</h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Try clearing your search query or switching categories.</p>
          <button
            onClick={() => {
              setSelectedCategory && setSelectedCategory('All');
              setSearch('');
              setActiveQuery('');
            }}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            View All Collections
          </button>
        </div>
      ) : (selectedCategory !== 'All' || activeQuery || search) ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div>
          {renderCategorySection('🔥 Trending Items', '🔥', 'Trending')}
          {renderCategorySection('💄 Cosmetics & Beauty Glow', '💄', 'Cosmetics')}
          {renderCategorySection('👧 Girls Dress & Outfit Collection', '👧', 'Girls')}
          {renderCategorySection('👦 Boys Clothing & Outerwear', '👦', 'Boys')}
          {renderCategorySection('🏷️ Exclusive Offers & Discounts', '🏷️', 'Offers')}
        </div>
      )}
    </div>
  );
}