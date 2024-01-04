const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4173; // PORT environment variable for services like Google Cloud Run

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All routes not handled will redirect to the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
