const axios = require('axios');

async function fetchBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("📚 Verfügbare Bücher im Shop:");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Buchliste:", error.message);
  }
}

fetchBooks();
