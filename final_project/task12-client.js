const axios = require('axios');

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(`📚 Bücher von ${author}:`);
    console.log(response.data);
  } catch (error) {
    console.error(`❌ Fehler beim Abrufen der Bücher von ${author}:`, error.message);
  }
}

getBooksByAuthor("Dante Alighieri"); // Beispielautor
