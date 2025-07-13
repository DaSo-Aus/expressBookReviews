const axios = require('axios');

function getBookByISBN(isbn) {
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      console.log(`📘 Buch mit ISBN ${isbn}:`);
      console.log(response.data);
    })
    .catch(error => {
      console.error(`❌ Fehler beim Abrufen der ISBN ${isbn}:`, error.message);
    });
}

getBookByISBN("1"); // Beispiel-ISBN
