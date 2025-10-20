// pages/dashboard.tsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div
      style={{
        background: "#0b0b0f",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "60px 24px",
      }}
    >
      <h1
        style={{
          fontWeight: 900,
          fontSize: "2rem",
          background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My DaemonCore Purchases
      </h1>
      {orders.length === 0 ? (
        <p style={{ opacity: 0.8 }}>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order: any) => (
            <li key={order.id}>
              {order.attributes?.first_order_item?.product_name} —{" "}
              {order.attributes?.total_formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
