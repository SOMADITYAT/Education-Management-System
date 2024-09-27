import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <button className="bg-green-500 text-white p-3 rounded-md">
          Add New Course
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
