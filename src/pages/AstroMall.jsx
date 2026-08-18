import { ShoppingBag, Star, Sparkles } from 'lucide-react';

export default function AstroMall() {
  const products = [
    { id: 1, name: 'Natural Yellow Sapphire', category: 'Gemstones', price: '₹15,000', rating: 4.8, img: 'https://images.unsplash.com/photo-1615367355209-66df65545a49?auto=format&fit=crop&q=80&w=300' },
    { id: 2, name: '5 Mukhi Rudraksha', category: 'Rudraksha', price: '₹499', rating: 4.9, img: 'https://images.unsplash.com/photo-1598463204998-385a52865910?auto=format&fit=crop&q=80&w=300' },
    { id: 3, name: 'Crystal Tortoise', category: 'Vastu', price: '₹799', rating: 4.5, img: 'https://images.unsplash.com/photo-1536034177579-9941a8db9d02?auto=format&fit=crop&q=80&w=300' },
    { id: 4, name: 'Navgraha Yantra', category: 'Yantras', price: '₹1,200', rating: 4.7, img: 'https://images.unsplash.com/photo-1600862562478-f7724a3501a4?auto=format&fit=crop&q=80&w=300' },
    { id: 5, name: 'Blue Sapphire (Neelam)', category: 'Gemstones', price: '₹22,000', rating: 4.9, img: 'https://images.unsplash.com/photo-1615367355209-66df65545a49?auto=format&fit=crop&q=80&w=300' },
    { id: 6, name: '7 Mukhi Rudraksha', category: 'Rudraksha', price: '₹1,500', rating: 4.8, img: 'https://images.unsplash.com/photo-1598463204998-385a52865910?auto=format&fit=crop&q=80&w=300' },
    { id: 7, name: 'Gomati Chakra', category: 'Pooja Items', price: '₹350', rating: 4.6, img: 'https://images.unsplash.com/photo-1536034177579-9941a8db9d02?auto=format&fit=crop&q=80&w=300' },
    { id: 8, name: 'Shree Yantra', category: 'Yantras', price: '₹950', rating: 4.9, img: 'https://images.unsplash.com/photo-1600862562478-f7724a3501a4?auto=format&fit=crop&q=80&w=300' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      
      <section className="text-center" style={{ padding: '60px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'var(--color-primary)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>
        
        <div className="container flex-col items-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="floating-element" style={{ marginBottom: '20px' }}>
            <Sparkles size={48} color="var(--color-secondary)" />
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AstroMall
          </h1>
          <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto' }}>
            100% Genuine, Lab Certified, and Energized Astrological Artifacts
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '0 20px' }}>
        <div className="grid grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ height: '220px', position: 'relative' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-bg-start), transparent)' }}></div>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '-20px', position: 'relative', zIndex: 1 }}>
                <p className="text-primary" style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{product.category}</p>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', flex: 1, lineHeight: '1.3' }}>{product.name}</h3>
                
                <div className="flex items-center gap-1" style={{ color: 'var(--color-secondary)', marginBottom: '20px' }}>
                  <Star size={16} fill="var(--color-secondary)" />
                  <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{product.rating}</span>
                </div>

                <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>{product.price}</span>
                  <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
