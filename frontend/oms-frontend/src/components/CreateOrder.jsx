// src/components/CreateOrder.jsx
import { useState } from "react";
import { useOrderStore } from '../stores/OrderStore';

export const CreateOrder = ({ onClose }) => {
  const addOrder = useOrderStore((state) => state.addOrder);

  const [formData, setFormData] = useState({
    customer: "",
    items: [{ name: "", quantity: 1 }],
    payment: "Unpaid",
    reserveInventory: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000)}`,
      ...formData,
    };
    addOrder(newOrder); // ➡️ Save to global state
    onClose();
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...formData.items];
    newItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 1 }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log("Order created:", formData);
  //     setIsSubmitting(false);
  //     setSubmitSuccess(true);
  //     // Reset form after 2 seconds
  //     setTimeout(() => setSubmitSuccess(false), 2000);
  //   }, 1500);
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          Order created successfully! Inventory {formData.reserveInventory ? "reserved" : "not reserved"}.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Field */}
        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Dynamic Items List */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(index, e)}
                placeholder="Item name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                min="1"
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
          >
            + Add Item
          </button>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Inventory Lock Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="reserveInventory"
            name="reserveInventory"
            checked={formData.reserveInventory}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="reserveInventory" className="ml-2 block text-sm text-gray-700">
            Reserve inventory (prevent double-selling)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating Order..." : "Create Order"}
        </button>
      </form>
    </div>
  );
};