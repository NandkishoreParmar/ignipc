// src/components/OrderStatusBadge.js
export const OrderStatusBadge = ({ status }) => {
  // Map statuses to Tailwind classes
  const statusToClasses = {
    Placed: "bg-blue-100 text-blue-800 border border-blue-200",
    Picked: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    Shipped: "bg-purple-100 text-purple-800 border border-purple-200",
    Delivered: "bg-green-100 text-green-800 border border-green-200",
  };

  return `
    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusToClasses[status]}">
      ${status}
    </span>
  `;
};