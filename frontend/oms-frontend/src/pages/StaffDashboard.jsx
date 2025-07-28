// src/pages/StaffDashboard.jsx
import { CreateOrder } from "../components/CreateOrder";

export const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Staff Order Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create new orders and manage inventory
          </p>
        </div>
        
        {/* Main Content Area */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
          <CreateOrder />
        </div>

        {/* Additional staff tools could be added here */}
        {/* e.g., Quick order stats, recent activity, etc. */}
      </div>
    </div>
  );
};