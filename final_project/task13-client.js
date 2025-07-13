const axios = require('axios');

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(`📘 Bücher mit Titel "${title}":`);
    console.log(response.data);
  } catch (error) {
    console.error(`❌ Fehler beim Abrufen von "${title}":`, error.message);
  }
}

getBooksByTitle("One Thousand and One Nights"); // Beispiel-Titel
