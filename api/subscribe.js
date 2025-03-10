import { kv } from '@vercel/kv';

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email } = req.body;

    // Validate inputs
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if email already exists
    const existingSubscriber = await kv.get(`subscriber:${email}`);
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create subscriber object
    const newSubscriber = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      createdAt: new Date().toISOString()
    };

    // Store in Vercel KV
    await kv.set(`subscriber:${email}`, newSubscriber);
    await kv.sadd('subscribers', email);

    // Return success response
    res.status(201).json({ 
      message: 'Subscription successful',
      subscriber: newSubscriber 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
} 