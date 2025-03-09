const fs = require('fs');
const path = require('path');

// Path to the JSON file (in /tmp to ensure it's writable in serverless environment)
const dataFilePath = path.join('/tmp', 'subscribers.json');

// Initialize the JSON file if it doesn't exist
const initializeFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

// Get all subscribers
const getSubscribers = () => {
  initializeFile();
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

// Save subscribers
const saveSubscribers = (subscribers) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(subscribers, null, 2));
};

// Handle API requests
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST request - add a new subscriber
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
      }
      
      const subscribers = getSubscribers();
      
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
      saveSubscribers(subscribers);
      
      return res.status(201).json(newSubscriber);
    } catch (error) {
      console.error('Error adding subscriber:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
  // GET request - get all subscribers (with basic auth)
  if (req.method === 'GET') {
    try {
      // Simple basic auth
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Basic ${Buffer.from('admin:yourpassword').toString('base64')}`) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const subscribers = getSubscribers();
      return res.status(200).json(subscribers);
    } catch (error) {
      console.error('Error getting subscribers:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}; 