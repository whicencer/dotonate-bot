const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('./db.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the SQLite database.');
    });

    this.db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      userId TEXT,
      isPremium INTEGER,
      viaLanding INTEGER,
      createdAt TEXT
    )`, err => {
      if (err) {
        console.error(err.message);
      }

      console.log('Table users created or already exists.');
    });
  }

  addUser(user) {
    const checkUserExists = `SELECT COUNT(*) as count FROM users WHERE username = ?`;

    return new Promise((resolve, reject) => {
      this.db.get(checkUserExists, [user.username], (err, row) => {
        if (err) {
          console.error(err.message);
        } else if (row.count <= 0) {
          this.db.run(`INSERT INTO users (username, userId, isPremium, viaLanding, createdAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`, [user.username, user.userId, user.isPremium, user.viaLanding], err => {
            if (err) {
              reject(err.message);
            } else {
              resolve(user);
            }
          });
        }
      });
    });
  }

  getUsersLength() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  getUsersWithLanding() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users WHERE viaLanding = 1`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  getUsersADay() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users WHERE createdAt > DATETIME('now', '-1 day')`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  getUsersAWeek() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users WHERE createdAt > DATETIME('now', '-7 day')`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  getUsersAMonth() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users WHERE createdAt > DATETIME('now', '-1 month')`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  getUsersWithPremium() {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT COUNT(*) as count FROM users WHERE isPremium = 1`, (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row.count);
        }
      })
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = new Database();