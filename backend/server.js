const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// File path for storing subscribers
const dataFilePath = path.join(__dirname, 'subscribers.json');

// Initialize subscribers file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
  console.log('Created subscribers.json file for data storage');
}

// Add a new subscriber
app.post('/api/subscribers', (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    
    // Read existing subscribers
    const subscribers = JSON.parse(fs.readFileSync(dataFilePath));
    
    // Check if email already exists
    if (subscribers.some(sub => sub.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Add new subscriber
    const newSubscriber = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    subscribers.push(newSubscriber);
    
    // Save to file
    fs.writeFileSync(dataFilePath, JSON.stringify(subscribers, null, 2));
    console.log(`New subscriber added: ${email}`);
    
    res.status(201).json(newSubscriber);
  } catch (err) {
    console.error('Error saving subscriber:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subscribers (password protected)
app.get('/api/subscribers', (req, res) => {
  // Simple basic auth
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Basic ${Buffer.from('admin:yourpassword').toString('base64')}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const subscribers = JSON.parse(fs.readFileSync(dataFilePath));
    console.log(`Retrieved ${subscribers.length} subscribers`);
    res.json(subscribers);
  } catch (err) {
    console.error('Error reading subscribers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export subscribers as CSV
app.get('/api/subscribers/export', (req, res) => {
  // Simple basic auth
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Basic ${Buffer.from('admin:yourpassword').toString('base64')}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const subscribers = JSON.parse(fs.readFileSync(dataFilePath));
    
    // Create CSV content
    let csv = 'Name,Email,Date\n';
    subscribers.forEach(sub => {
      const date = new Date(sub.createdAt).toLocaleDateString();
      csv += `"${sub.name}","${sub.email}","${date}"\n`;
    });
    
    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    
    res.send(csv);
  } catch (err) {
    console.error('Error exporting subscribers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve the admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 