import { useState } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';

const products = [
  { id: 1, name: 'Natural Amethyst Crystal', category: 'Gemstones', price: 899, originalPrice: 1299, rating: 4.8, reviews: 234, color: '#a855f7', emoji: '💜', tag: 'Bestseller' },
  { id: 2, name: '5 Mukhi Rudraksha', category: 'Rudraksha', price: 549, originalPrice: 799, rating: 4.9, reviews: 567, color: '#f43f5e', emoji: '🟤', tag: 'Most Popular' },
  { id: 3, name: 'Shree Yantra (Silver)', category: 'Yantra', price: 1499, originalPrice: 2299, rating: 4.7, reviews: 89, color: '#fbbf24', emoji: '⭐', tag: null },
  { id: 4, name: 'Rose Quartz Bracelet', category: 'Gemstones', price: 349, originalPrice: 599, rating: 4.6, reviews: 421, color: '#ec4899', emoji: '🩷', tag: 'Sale' },
  { id: 5, name: 'Vedic Astrology Bible', category: 'Books', price: 699, originalPrice: 999, rating: 4.9, reviews: 1203, color: '#38bdf8', emoji: '📗', tag: 'Bestseller' },
  { id: 6, name: 'Tiger Eye Pendant', category: 'Gemstones', price: 449, originalPrice: 749, rating: 4.7, reviews: 176, color: '#f97316', emoji: '🐯', tag: null },
  { id: 7, name: 'Mahamrityunjaya Yantra', category: 'Yantra', price: 1999, originalPrice: 3499, rating: 4.8, reviews: 54, color: '#34d399', emoji: '🔯', tag: null },
  { id: 8, name: 'Bhrigu Samhita (Hindi)', category: 'Books', price: 599, originalPrice: 850, rating: 4.6, reviews: 87, color: '#818cf8', emoji: '📙', tag: null },
  { id: 9, name: '11 Mukhi Rudraksha', category: 'Rudraksha', price: 2499, originalPrice: 3999, rating: 5.0, reviews: 28, color: '#fb923c', emoji: '🟠', tag: 'Premium' },
];

const categories = ['All', 'Gemstones', 'Rudraksha', 'Yantra', 'Books'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  const addToCart = (id) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, marginBottom: '6px',
            background: 'linear-gradient(90deg, #34d399, #38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>AstroMall Shop</h1>
          <p style={{ color: '#9ca3af', fontSize: '15px' }}>Authentic gemstones, rudraksha, yantra & sacred texts</p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>
          <ShoppingCart size={16} />
          Cart {cart.length > 0 && <span style={{
            background: '#a855f7', color: '#fff', borderRadius: '50%',
            width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700,
          }}>{cart.length}</span>}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', margin: '28px 0', flexWrap: 'wrap' }}>
        <Filter size={16} style={{ color: '#9ca3af', marginRight: '4px', alignSelf: 'center' }} />
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            background: activeCategory === c ? 'linear-gradient(135deg, #34d399, #38bdf8)' : 'rgba(255,255,255,0.05)',
            color: activeCategory === c ? '#1a1a1a' : '#9ca3af',
            border: activeCategory === c ? 'none' : '1px solid rgba(255,255,255,0.08)',
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
        {filtered.map(p => {
          const inCart = cart.includes(p.id);
          const discount = Math.round((1 - p.price / p.originalPrice) * 100);
          return (
            <div key={p.id} style={{
              borderRadius: '20px', overflow: 'hidden',
              background: 'rgba(20,20,28,0.7)', backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.07)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${p.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Product Image Area */}
              <div style={{
                height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${p.color}12`, fontSize: '64px', position: 'relative',
              }}>
                {p.tag && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                    background: p.color, color: '#fff',
                  }}>{p.tag}</div>
                )}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  padding: '3px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                  background: '#22c55e22', color: '#22c55e', border: '1px solid #22c55e40',
                }}>{discount}% OFF</div>
                {p.emoji}
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', color: p.color, fontWeight: 600, marginBottom: '4px' }}>{p.category}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>{p.name}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <Star size={12} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{p.rating}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>({p.reviews})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>₹{p.price.toLocaleString()}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'line-through' }}>₹{p.originalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => addToCart(p.id)}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                    background: inCart ? 'rgba(34,197,94,0.15)' : `${p.color}22`,
                    color: inCart ? '#22c55e' : p.color,
                    border: inCart ? '1px solid #22c55e40' : `1px solid ${p.color}40`,
                    fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <ShoppingCart size={14} />
                  {inCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
