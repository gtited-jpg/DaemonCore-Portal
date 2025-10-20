// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";

type LSOrder = {
  id: string;
  type: "orders";
  attributes: {
    user_email: string;
    status: string;
    status_formatted: string;
    total_formatted: string;
    created_at: string;
    first_order_item?: {
      product_name: string;
      variant_name: string;
      price: number;
      quantity: number;
      test_mode: boolean;
    };
    urls?: { receipt?: string };
    test_mode: boolean;
  };
  relationships?: {
    ["license-keys"]?: { links: { related: string } };
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const email = (req.query.email as string)?.trim();
  if (!email) return res.status(400).json({ error: "Missing email" });

  try {
    // 1) Fetch all orders
    const ordersRes = await fetch("https://api.lemonsqueezy.com/v1/orders", {
      headers: {
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      cache: "no-store",
    });

    if (!ordersRes.ok) {
      const t = await ordersRes.text();
      console.error("LS orders error:", ordersRes.status, t);
      return res.status(ordersRes.status).json({ error: "LemonSqueezy API error" });
    }

    const ordersJson = await ordersRes.json();
    const all: LSOrder[] = ordersJson.data || [];

    // 2) Filter to just this user's orders
    const mine = all.filter(
      (o) => o?.attributes?.user_email?.toLowerCase() === email.toLowerCase()
    );

    // 3) For each order, fetch its license keys (if any)
    const enriched = await Promise.all(
      mine.map(async (o) => {
        let licenseKey: string | null = null;
        let licenseStatus: string | null = null;

        // Follow the relationship link if present
        const rel = o.relationships?.["license-keys"]?.links?.related;
        if (rel) {
          try {
            const licRes = await fetch(rel, {
              headers: {
                Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
              },
              cache: "no-store",
            });

            if (licRes.ok) {
              const licJson = await licRes.json();
              const first = (licJson.data && licJson.data[0]) || null;
              if (first?.attributes) {
                licenseKey = first.attributes.key || null;
                licenseStatus = first.attributes.status || null;
              }
            } else {
              const t = await licRes.text();
              console.warn("LS license error:", licRes.status, t);
            }
          } catch (e) {
            console.warn("License fetch failed:", e);
          }
        }

        // 4) Shape a clean object for the frontend
        const a = o.attributes;
        const item = a.first_order_item || ({} as any);

        return {
          id: o.id,
          email: a.user_email,
          status: a.status_formatted || a.status,
          total: a.total_formatted,
          productName: item.product_name || "Product",
          variantName: item.variant_name || "",
          testMode: !!a.test_mode || !!item.test_mode,
          receiptUrl: a.urls?.receipt || null,
          createdAt: a.created_at,
          licenseKey,
          licenseStatus,
        };
      })
    );

    return res.status(200).json({ orders: enriched });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
