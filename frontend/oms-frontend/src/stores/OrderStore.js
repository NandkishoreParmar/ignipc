


// src/stores/OrderStore.js
import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orders: [
    { id: "ORD-001", customer: "John Doe", status: "Placed", payment: "Paid" },
    { id: "ORD-002", customer: "Jane Smith", status: "Shipped", payment: "Unpaid" },
  ],
  addOrder: (newOrder) => 
    set((state) => ({ orders: [...state.orders, newOrder] })),
  updateOrder: (updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ),
    })),
}));