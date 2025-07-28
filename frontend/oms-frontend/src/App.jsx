// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// src/App.jsx
import {AdminDashboard} from './pages/AdminDashboard';
import {CustomerSelfService} from './pages/CustomerSelfService';
import {StaffDashboard} from './pages/StaffDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/" element={<CustomerSelfService />} />
      </Routes>
    </Router>
  );
}

export default App;