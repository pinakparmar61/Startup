// src/pages/AdminPage.jsx
import React from "react";
import MainLayout from "../layout/MainLayout";
import { Helmet } from "react-helmet-async";

const AdminPage = () => {
  return (
    <MainLayout title="Admin Dashboard">
      <Helmet><title>Admin — StartUp</title></Helmet>
      <div className="space-y-6">
        <p className="text-gray-300">Welcome, admin. This page is protected.</p>
        <button
          className="px-4 py-2 bg-red-600 rounded"
          onClick={() => {
            // quick logout
            localStorage.removeItem("admin_token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
