import React from 'react';
import { useCart } from '../hooks/useCart';
import OffersAndCoupons from './OffersAndCoupons';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, addToCart, removeFromCart, totalAmount } = useCart();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '400px', maxWidth: '90%', height: '100%', backgroundColor: '#fff',
        display: 'flex', flexDirection: 'column', padding: '1.5rem', boxShadow: '-4px 0 15px rgba(0,0,0,0.2)'
      }}>
        {/* Cart Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', pb: '1rem' }}>
          <h2>Shopping Cart ({cart.reduce((a, b) => a + b.qty, 0)})</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', margin: '1rem 0' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.8rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{item.name}</h4>
                  <p style={{ margin: '0.2rem 0', color: '#2563eb', fontWeight: 'bold' }}>${item.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => addToCart(item)} style={{ padding: '2px 8px', cursor: 'pointer' }}>+</button>
                    <span>{item.qty}</span>
                    <button onClick={() => removeFromCart(item._id)} style={{ padding: '2px 8px', cursor: 'pointer', background: '#f87171', color: '#fff', border: 'none' }}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupons & Subtotal */}
        {cart.length > 0 && (
          <div>
            <OffersAndCoupons />
            <div style={{ marginTop: '1rem', borderTop: '2px solid #e2e8f0', pt: '1rem' }}>
              <h3>Total: ${totalAmount.toFixed(2)}</h3>
              <button 
                onClick={() => alert('Proceeding to checkout!')} 
                style={{ width: '100%', padding: '0.8rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}