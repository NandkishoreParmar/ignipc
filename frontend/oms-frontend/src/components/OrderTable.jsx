// src/components/OrderTable.jsx
import { OrderStatusBadge } from "./OrderStatusBadge";

export const OrderTable = ({ orders, onEdit }) => {
  // Mock data (replace with API later)
  const mockOrders = orders || [
    { id: "ORD-001", customer: "John Doe", status: "Placed", payment: "Paid" },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      status: "Shipped",
      payment: "Unpaid",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.payment === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.payment}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onEdit(order)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
