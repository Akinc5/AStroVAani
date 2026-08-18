import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Send, User } from 'lucide-react';

export default function AstrologerDashboard() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleReply = (receiverId) => {
    if (!replyText.trim() || !socket) return;
    
    const messageData = {
      senderId: user.id,
      receiverId: receiverId, 
      content: replyText
    };
    
    socket.emit('sendMessage', messageData);
    setMessages(prev => [...prev, { ...messageData, timestamp: new Date() }]);
    setReplyText('');
  };

  if (!user || user.type !== 'astrologer') {
    return <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}><h2>Access Denied. You must be an astrologer.</h2></div>;
  }

  // Group messages by user
  const groupedMessages = messages.reduce((acc, msg) => {
    const otherId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
    if (!acc[otherId]) acc[otherId] = [];
    acc[otherId].push(msg);
    return acc;
  }, {});

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 20px', paddingBottom: '100px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '40px', letterSpacing: '-1px', background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Mystic Dashboard
      </h1>
      
      {Object.keys(groupedMessages).length === 0 ? (
        <div className="card glass" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <User size={64} color="var(--color-text-muted)" />
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>No seekers have reached out yet. Waiting for connections...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {Object.entries(groupedMessages).map(([clientId, msgs]) => (
            <div key={clientId} className="card glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '500px' }}>
              <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  S{clientId}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Seeker #{clientId}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#2dd4bf' }}>Online</span>
                </div>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '10px' }}>
                {msgs.map((msg, i) => (
                  <div key={i} style={{ 
                    alignSelf: msg.senderId === user.id ? 'flex-end' : 'flex-start',
                    background: msg.senderId === user.id ? 'var(--color-primary)' : 'var(--color-surface-hover)',
                    color: msg.senderId === user.id ? 'white' : 'var(--color-text)',
                    padding: '12px 18px',
                    borderRadius: msg.senderId === user.id ? '20px 20px 0 20px' : '20px 20px 20px 0',
                    maxWidth: '80%',
                    boxShadow: msg.senderId === user.id ? '0 4px 10px var(--color-primary-glow)' : 'none',
                  }}>
                    {msg.content}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2" style={{ background: 'var(--color-bg-start)', padding: '10px', borderRadius: '50px', border: '1px solid var(--color-border)' }}>
                <input 
                  type="text" 
                  value={replyText} 
                  onChange={e => setReplyText(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && handleReply(parseInt(clientId))}
                  placeholder="Channel your wisdom..."
                  style={{ flex: 1, padding: '10px 15px', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text)' }}
                />
                <button className="btn btn-primary" onClick={() => handleReply(parseInt(clientId))} style={{ borderRadius: '50%', width: '45px', height: '45px', padding: 0 }}>
                  <Send size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
