const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();
app.use(express.json());

// Configure the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});


app.post('/students/create-table', (req, res) => {
  const query = `CREATE TABLE student(id INT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Failed to create a table' });
    }
    res.json(results);
  });
});

app.post('/students/insert', (req, res) => {
  const { id, name } = req.body;
  const query = `INSERT INTO student (id, name) VALUES (?, ?)`;

  // The second argument is an array of values that replace the placeholders
  const values = [id, name];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Failed to insert data' });
    }
    res.json(results);
  });
});

app.get('/students', (req, res) => {
  const query = 'SELECT * FROM student';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
});


// Start the server
const port = 6003;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
