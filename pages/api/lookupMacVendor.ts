import axios from 'axios';

export default async function handler(req, res) {
  const { macAddress } = req.query;
  try {
    const response = await axios.get(`https://api.macvendors.com/${encodeURIComponent(macAddress)}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}