import React, { useState } from 'react';
import API from '../services/api';
import { useCart } from '../hooks/useCart';

export default function OffersAndCoupons() {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [msg, setMsg] = useState('');
  const { totalAmount } = useCart();

  const handleApplyCoupon = async () => {
    try {
      const { data } = await API.post('/coupons/validate', { code: couponCode });
      setDiscount(data.discount);
      setMsg(`Success! ${data.discount}% discount applied.`);
    } catch (err) {
      setDiscount(0);
      setMsg(err.response?.data?.message || 'Invalid coupon code');
    }
  };

  const finalPrice = totalAmount - (totalAmount * discount) / 100;

  return (
    <div style={{ padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#f8fafc', marginTop: '1.5rem' }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>🎁 Active Offers & Coupons</h3>
      <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
        <p>• Use <strong>SAVE10</strong> for 10% Off</p>
        <p>• Use <strong>WELCOME20</strong> for 20% Off</p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleApplyCoupon} style={{ padding: '0.5rem 1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Apply
        </button>
      </div>

      {msg && <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: discount ? 'green' : 'red' }}>{msg}</p>}

      {discount > 0 && (
        <div style={{ marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd' }}>
          <p>Original Total: <strong>${totalAmount.toFixed(2)}</strong></p>
          <p style={{ color: 'green' }}>Discount ({discount}%): <strong>-${((totalAmount * discount) / 100).toFixed(2)}</strong></p>
          <h4>Final Amount: ${finalPrice.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}