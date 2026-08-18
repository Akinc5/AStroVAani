const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For hackathon
    methods: ['GET', 'POST']
  }
});

const JWT_SECRET = 'hackathon_secret';

// Basic Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API Routes
app.post('/api/register', (req, res) => {
  const { username, password, type } = req.body;
  if (!username || !password || !type) return res.status(400).json({ error: 'Missing fields' });

  db.run('INSERT INTO users (username, password, type) VALUES (?, ?, ?)', [username, password, type], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    
    const token = jwt.sign({ id: this.lastID, username, type }, JWT_SECRET);
    res.json({ token, user: { id: this.lastID, username, type } });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: row.id, username: row.username, type: row.type }, JWT_SECRET);
    res.json({ token, user: { id: row.id, username: row.username, type: row.type } });
  });
});

app.get('/api/me', authenticateToken, (req, res) => {
  db.get('SELECT id, username, type FROM users WHERE id = ?', [req.user.id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Not found' });
    if (row.type === 'astrologer') {
      db.get('SELECT * FROM astrologers WHERE user_id = ?', [row.id], (err, astro) => {
        res.json({ user: row, profile: astro });
      });
    } else {
      res.json({ user: row });
    }
  });
});

app.get('/api/astrologers', (req, res) => {
  db.all('SELECT * FROM astrologers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Socket.io Chat Logic
const activeSockets = new Map(); // Map user/astro ID to Socket ID

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('register', (userId) => {
    activeSockets.set(userId, socket.id);
    console.log(`User/Astro ${userId} registered to socket ${socket.id}`);
  });

  socket.on('sendMessage', (data) => {
    // data: { senderId, receiverId, content }
    const { senderId, receiverId, content } = data;
    
    db.run('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)', 
      [senderId, receiverId, content], 
      function(err) {
        if (!err) {
          const message = { id: this.lastID, senderId, receiverId, content, timestamp: new Date() };
          
          // Send to receiver if online
          const receiverSocketId = activeSockets.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', message);
          }
          
          // Acknowledge back to sender
          socket.emit('messageSent', message);
        }
      }
    );
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of activeSockets.entries()) {
      if (socketId === socket.id) {
        activeSockets.delete(userId);
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
