
const express = require('express');
const app = express();
const port = 3001;
const connectDB = require('./config/database');
require('dotenv').config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the current directory
app.use(express.static('./'));

// Add a root redirect to index.html for convenience
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Add server status route for testing
app.get('/status', (req, res) => {
  res.json({ status: 'Server is running correctly' });
});

// Define API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/moods', require('./routes/api/moods'));

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`View your app at: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});
