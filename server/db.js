const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'astro.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      // Create Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          type TEXT NOT NULL CHECK(type IN ('user', 'astrologer'))
        )
      `);

      // Create Astrologers table
      db.run(`
        CREATE TABLE IF NOT EXISTS astrologers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          name TEXT NOT NULL,
          skill TEXT,
          exp TEXT,
          rating REAL DEFAULT 5.0,
          price TEXT,
          phone TEXT,
          img TEXT,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )
      `, (err) => {
        if (!err) {
          // Seed initial data if empty
          db.get("SELECT COUNT(*) as count FROM astrologers", (err, row) => {
            if (row && row.count === 0) {
              const stmt = db.prepare(`
                INSERT INTO astrologers (user_id, name, skill, exp, rating, price, phone, img) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `);
              // Assuming we have a mock user ID for them, let's just insert astrologers for display purposes
              // The frontend will fetch these. Since they need user_ids, we will create dummy users first.
              
              const dummyUsers = [
                ['astro_rahul', 'pass', 'astrologer'],
                ['tarot_priya', 'pass', 'astrologer'],
                ['vastu_amit', 'pass', 'astrologer'],
              ];
              
              const userStmt = db.prepare("INSERT INTO users (username, password, type) VALUES (?, ?, ?)");
              
              dummyUsers.forEach((u, i) => {
                userStmt.run(u, function(err) {
                  if (!err) {
                    const astros = [
                      [this.lastID, 'Astro Rahul', 'Vedic, Tarot', '5 Years', 4.9, '₹20/min', '+919999999991', 'https://i.pravatar.cc/150?u=rahul'],
                      [this.lastID, 'Tarot Priya', 'Tarot, Numerology', '8 Years', 5.0, '₹25/min', '+919999999992', 'https://i.pravatar.cc/150?u=priya'],
                      [this.lastID, 'Vastu Amit', 'Vedic, Vastu', '12 Years', 4.8, '₹30/min', '+919999999993', 'https://i.pravatar.cc/150?u=amit'],
                    ];
                    stmt.run(astros[i]);
                  }
                });
              });
              userStmt.finalize();
            }
          });
        }
      });
      
      // Create Messages table for chat history
      db.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_id INTEGER NOT NULL,
          receiver_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Planetary Positions table
      db.run(`
        CREATE TABLE IF NOT EXISTS planetary_positions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          planet TEXT NOT NULL,
          longitude REAL NOT NULL,
          sign TEXT NOT NULL,
          degree REAL NOT NULL,
          retrograde BOOLEAN,
          calculation_system TEXT,
          ayanamsa TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create Daily Horoscopes table
      db.run(`
        CREATE TABLE IF NOT EXISTS daily_horoscopes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          sign TEXT NOT NULL,
          overall_score INTEGER,
          career_score INTEGER,
          love_score INTEGER,
          finance_score INTEGER,
          health_score INTEGER,
          overall_text TEXT,
          career_text TEXT,
          love_text TEXT,
          finance_text TEXT,
          health_text TEXT,
          advice TEXT,
          signals TEXT,
          planetary_data TEXT,
          generation_model TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(date, sign)
        )
      `);
    });
  }
});

module.exports = db;
