import React from 'react';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'trending': return 'badge-trending';
      case 'cosmetics': return 'badge-cosmetics';
      case 'girls': return 'badge-girls';
      case 'boys': return 'badge-boys';
      case 'offers': return 'badge-offers';
      default: return 'badge-trending';
    }
  };

  const categoryName = product.category || 'Collection';
  const rating = product.rating || 4.8;
  const numReviews = product.numReviews || 45;

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <span className={`badge-tag ${getBadgeClass(categoryName)}`}>
          {categoryName}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <span className="product-category-text">{categoryName} Collection</span>
        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating">
          <span>{"★".repeat(Math.floor(rating))}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '0.2rem' }}>
            {rating} ({numReviews})
          </span>
        </div>

        <p style={{
          color: '#64748b',
          fontSize: '0.86rem',
          lineHeight: '1.4',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>

        <div className="product-bottom">
          <div className="product-price">${Number(product.price).toFixed(2)}</div>
          <button
            onClick={() => addToCart(product)}
            className="add-cart-btn"
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}