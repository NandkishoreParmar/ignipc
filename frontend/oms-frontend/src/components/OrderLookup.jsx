// src/components/OrderLookup.jsx
import { useState } from "react";
import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderLookup = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API call (replace with real fetch later)
  const fetchOrder = (id) => {
    setIsLoading(true);
    setError("");
    
    // Simulate API delay
    setTimeout(() => {
      if (id === "ORD-123") {  // Mock valid order
        setOrder({
          id: "ORD-123",
          customer: "Alex Johnson",
          status: "Shipped",
          payment: "Paid",
          items: [
            { name: "T-Shirt", quantity: 2, price: 19.99 },
            { name: "Jeans", quantity: 1, price: 49.99 },
          ],
        });
      } else {
        setError("Order not found. Please check the ID.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    fetchOrder(orderId);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
            Order ID
          </label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., ORD-123"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Searching..." : "Track Order"}
        </button>
      </form>

      {/* Results/Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {order && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Order Details</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">ID:</span> {order.id}</p>
            <p><span className="font-semibold">Customer:</span> {order.customer}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <OrderStatusBadge status={order.status} />
            </p>
            <p>
              <span className="font-semibold">Payment:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  order.payment === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.payment}
              </span>
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium">Items</h4>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};