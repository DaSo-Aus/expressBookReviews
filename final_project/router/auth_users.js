const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
users.push({ username: "neueruser", password: "geheim123" });


const isValid = (username) => {
  return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};


//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid login credentials." });
  }

  const accessToken = jwt.sign({ username }, "fingerprint_customer", { expiresIn: '1h' });

  return res.status(200).json({ message: "Login successful.", token: accessToken });
});



  const verifyToken = (req, res, next) => {
    console.log("verifyToken middleware reached");
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, "fingerprint_customer");
        req.user = decoded; // ⬅️ Das ist jetzt der Schlüssel!
      } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
    } else {
      return res.status(401).json({ message: "No token provided." });
    }
    next();
  };
  
  
  

// Add a book review
regd_users.put("/auth/review/:isbn", verifyToken, (req, res) => {
    console.log("Decoded user:", req.user);
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.user.username;
  
    if (!username) {
      return res.status(401).json({ message: "User not logged in." });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    if (!review) {
      return res.status(400).json({ message: "Review is required." });
    }
  
    // Rezension hinzufügen oder aktualisieren
    books[isbn].reviews[username] = review;
  
    return res.status(200).json({
      message: "Review successfully added or updated.",
      reviews: books[isbn].reviews
    });
  });
  
  regd_users.delete("/auth/review/:isbn", verifyToken, (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user?.username;
  
    if (!username) {
      return res.status(401).json({ message: "User not logged in." });
    }
  
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    if (!books[isbn].reviews[username]) {
      return res.status(404).json({ message: "No review found for this user." });
    }
  
    // 🔥 Rezension entfernen
    delete books[isbn].reviews[username];
  
    return res.status(200).json({ message: "Review deleted successfully." });
  });
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
