// lib/lemonsqueezy.ts
// Helper functions for fetching real Lemon Squeezy order data

export async function fetchOrders() {
  const res = await fetch('https://api.lemonsqueezy.com/v1/orders', {
    headers: {
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      Accept: 'application/vnd.api+json'
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('LemonSqueezy API Error:', res.status, text);
    throw new Error('Failed to fetch Lemon Squeezy orders');
  }

  const json = await res.json();
  return json.data; // array of order objects
}
