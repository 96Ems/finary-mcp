import express from 'express';
import { fetchFinaryData } from './index.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ "status": "ok" });
});

app.get('/mcp', (req, res) => {
  res.json({ "mcp": true });
});

app.get('/balance', async (req, res) => {
  const email = process.env.FINARY_EMAIL;
  const password = process.env.FINARY_PASSWORD;

  if (!email || !password) {
    return res.status(500).json({ 
      error: 'Missing FINARY_EMAIL or FINARY_PASSWORD environment variables' 
    });
  }

  try {
    const data = await fetchFinaryData(email, password);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
