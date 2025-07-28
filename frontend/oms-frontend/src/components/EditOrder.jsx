// src/components/EditOrder.jsx
import { useState } from "react";
import { OrderStatusBadge } from "./OrderStatusBadge";

export const EditOrder = ({ order, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    status: order.status,
    payment: order.payment,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const statusOptions = ["Placed", "Picked", "Shipped", "Delivered"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate for demo
        onUpdate({ ...order, ...formData }); // Propagate update to parent
        onClose(); // Close modal/form
      } else {
        setError("Failed to update. Please try again.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Edit Order: <span className="font-mono">{order.id}</span>
      </h2>
      
      <div className="mb-4">
        <p className="font-medium">Current Status:</p>
        {order.status}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status Update */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Update Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            {statusOptions.map((option) => (
              <option 
                key={option} 
                value={option}
                disabled={statusOptions.indexOf(option) < statusOptions.indexOf(order.status)} // Prevent status regression
              >
                {option}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Note: Status can only progress forward (e.g., Shipped → Delivered).
          </p>
        </div>

        {/* Payment Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="payment"
            name="payment"
            checked={formData.payment === "Paid"}
            onChange={(e) => 
              setFormData({ ...formData, payment: e.target.checked ? "Paid" : "Unpaid" })
            }
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="payment" className="ml-2 block text-sm text-gray-700">
            Mark as Paid
          </label>
        </div>

        {/* Error/Success Feedback */}
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};