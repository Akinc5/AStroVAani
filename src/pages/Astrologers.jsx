import { useState, useEffect } from 'react';
import { Star, MessageCircle, Phone, Search, Filter, X } from 'lucide-react';
import { io } from 'socket.io-client';

export default function Astrologers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [astrologersList, setAstrologersList] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [socket, setSocket] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:3001/api/astrologers')
      .then(res => res.json())
      .then(data => setAstrologersList(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!user) return;
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    
    newSocket.on('connect', () => {
      newSocket.emit('register', user.id);
    });
    
    newSocket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return () => newSocket.close();
  }, [user]);

  const handleStartChat = (astroId, astroName) => {
    if (!user) {
      alert("Please login first to start chatting!");
      return;
    }
    setActiveChat({ astroId, name: astroName });
  };

  const handleSendMessage = () => {
    if (!replyText.trim() || !socket || !activeChat) return;
    
    const astro = astrologersList.find(a => a.id === activeChat.astroId);
    if (!astro) return;

    const messageData = {
      senderId: user.id,
      receiverId: astro.user_id, 
      content: replyText
    };
    
    socket.emit('sendMessage', messageData);
    setMessages(prev => [...prev, { ...messageData, timestamp: new Date() }]);
    setReplyText('');
  };

  const filteredAstrologers = astrologersList.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (a.skill && a.skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', position: 'relative' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Mystic Directory
        </h1>
        
        <div className="flex gap-4">
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
            <input 
              type="text" 
              placeholder="Search mystics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass"
              style={{ padding: '12px 15px 12px 45px', borderRadius: '50px', width: '300px', outline: 'none', color: 'var(--color-text)' }}
            />
          </div>
          <button className="btn btn-outline" style={{ padding: '12px', borderRadius: '50%' }}>
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-6 gap-y-12">
        {filteredAstrologers.map(astro => (
          <div key={astro.id} className="card glass" style={{ padding: '0 20px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="astro-img-wrapper">
              <img src={astro.img} alt={astro.name} className="astro-img" />
            </div>
            <h3 style={{ marginBottom: '5px', fontSize: '1.3rem' }}>{astro.name}</h3>
            <p className="text-primary" style={{ fontSize: '0.9rem', marginBottom: '5px', fontWeight: 600 }}>{astro.skill}</p>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Exp: {astro.exp}</p>
            
            <div className="flex items-center justify-between" style={{ marginBottom: '20px', padding: '10px', background: 'var(--color-bg-start)', borderRadius: 'var(--radius-sm)' }}>
              <div className="flex items-center gap-1" style={{ color: 'var(--color-secondary)' }}>
                <Star size={16} fill="var(--color-secondary)" />
                <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{astro.rating}</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                {astro.price}
              </div>
            </div>

            <div className="flex justify-center gap-2" style={{ marginTop: 'auto' }}>
              <button className="btn btn-outline" onClick={() => handleStartChat(astro.id, astro.name)} style={{ flex: 1, padding: '10px 0', fontSize: '0.9rem' }}>
                <MessageCircle size={16} /> Chat
              </button>
              <a href={`tel:${astro.phone}`} className="btn btn-primary" style={{ flex: 1, padding: '10px 0', fontSize: '0.9rem', textDecoration: 'none' }}>
                <Phone size={16} /> Call
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Chat Modal */}
      {activeChat && (
        <div className="card glass" style={{ position: 'fixed', bottom: '20px', right: '20px', width: '380px', height: '500px', display: 'flex', flexDirection: 'column', zIndex: 1000, overflow: 'hidden' }}>
          <div style={{ background: 'var(--color-bg-start)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <div style={{ width: '10px', height: '10px', background: '#2dd4bf', borderRadius: '50%', boxShadow: '0 0 10px #2dd4bf' }}></div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{activeChat.name}</h3>
            </div>
            <button onClick={() => setActiveChat(null)} style={{ background: 'transparent', color: 'var(--color-text-muted)' }}>
              <X size={20} />
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {messages.filter(m => {
               const astro = astrologersList.find(a => a.id === activeChat.astroId);
               return astro && (m.receiverId === astro.user_id || m.senderId === astro.user_id);
            }).map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.senderId === user.id ? 'flex-end' : 'flex-start',
                background: msg.senderId === user.id ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                color: msg.senderId === user.id ? 'white' : 'var(--color-text)',
                padding: '10px 15px',
                borderRadius: msg.senderId === user.id ? '20px 20px 0 20px' : '20px 20px 20px 0',
                maxWidth: '80%',
                boxShadow: msg.senderId === user.id ? '0 4px 10px var(--color-primary-glow)' : 'none',
              }}>
                {msg.content}
              </div>
            ))}
          </div>
          
          <div className="flex gap-2" style={{ padding: '15px', background: 'var(--color-bg-start)', borderTop: '1px solid var(--color-border)' }}>
            <input 
              type="text" 
              value={replyText} 
              onChange={e => setReplyText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              style={{ flex: 1, padding: '12px', borderRadius: '25px', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
            <button className="btn btn-primary" onClick={handleSendMessage} style={{ borderRadius: '50%', width: '45px', height: '45px', padding: 0 }}>
              <MessageCircle size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
