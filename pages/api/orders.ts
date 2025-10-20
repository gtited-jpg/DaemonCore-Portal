// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const email = req.query.email as string;
  if (!email) {
    res.status(400).json({ error: 'Missing email' });
    return;
  }

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/orders', {
      headers: {
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('LemonSqueezy API error:', response.status, text);
      res.status(response.status).json({ error: 'LemonSqueezy API error' });
      return;
    }

    const json = await response.json();

    // Only return orders for this user's email
    const filtered = (json.data || []).filter(
      (order: any) => order?.attributes?.user_email?.toLowerCase() === email.toLowerCase()
    );

    res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
