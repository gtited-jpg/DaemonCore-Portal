// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/orders", {
      headers: {
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("LemonSqueezy API error:", text);
      return res.status(500).json({ error: "LemonSqueezy API error" });
    }

    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error" });
  }
}
