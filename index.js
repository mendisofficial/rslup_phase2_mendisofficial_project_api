const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000; 
const secretKey = ''; // Replace with a strong secret key

// Middleware
app.use(bodyParser.json());

// Dummy user data (in-memory data)
let users = [
  { id: 1, username: 'user1', password: 'password1', name: 'User One' },
  { id: 2, username: 'user2', password: 'password2', name: 'User Two' },
];

// User CRUD Endpoints
// Create a new user
app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ message: 'User created successfully' });
});

// Read all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body;
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users[index] = user;
    res.json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.json({ message: 'User deleted successfully' });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and password
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ username: user.username }, secretKey);

  res.json({ message: 'Login successful', user: user, token: token });
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
