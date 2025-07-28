// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { OrderTable } from "../components/OrderTable";
import { EditOrder } from "../components/EditOrder";
import { useOrderStore } from '../stores/OrderStore';
export const AdminDashboard = () => {
  // Mock data
  const orders = useOrderStore((state) => state.orders);
  const updateOrder = useOrderStore((state) => state.updateOrder);
  // const [orders, setOrders] = useState([
  //   { id: "ORD-001", customer: "John Doe", status: "Placed", payment: "Paid" },
  //   { id: "ORD-002", customer: "Jane Smith", status: "Shipped", payment: "Unpaid" },
  // ]);

  // Edit modal state
  const [currentOrder, setCurrentOrder] = useState(null);

  // Handle order updates
  const handleUpdate = (updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
  };
  const handleEdit = (order) => {
  setCurrentOrder(order);
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management Dashboard</h1>
      
      {/* Search/Filter (simplified) */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="px-4 py-2 border rounded-md"
        />
        <select className="px-4 py-2 border rounded-md">
          <option value="">All Statuses</option>
          <option value="Placed">Placed</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>

      {/* Order Table */}
     <OrderTable orders={orders} onEdit={handleEdit} />

      {/* Edit Modal */}
      {currentOrder && (
  <div className="modal">
    <EditOrder 
      order={currentOrder} 
      onUpdate={handleUpdate} 
      onClose={() => setCurrentOrder(null)} 
    />
  </div>
)}
    </div>
  );
};