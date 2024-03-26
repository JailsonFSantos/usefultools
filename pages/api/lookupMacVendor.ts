import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { macAddress } = req.query;
  
  if (typeof macAddress === 'string') {
    try {
      const response = await axios.get(`https://api.macvendors.com/${encodeURIComponent(macAddress)}`);
      const data = response.data;
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(400).json({ error: 'Invalid macAddress' });
  }
}