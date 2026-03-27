import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import "../../DisplayView.css";
import { useState } from "react";

const StudentMenu = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };
  const username = sessionStorage.getItem("username");
  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-4 flex justify-between items-center z-50 bg-gradient-to-r from-purple-400 to-indigo-500">
        {/* Title */}
        <h1 className="text-2xl font-bold text-pink-600">
          Lost & Found - Student Panel
        </h1>

        {/* Menu */}
        <div className="flex gap-8 items-center relative">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/student")}
            className="hover:text-indigo-600"
          >
            Personal Details
          </button>

          {/* LOST ITEM DROPDOWN */}
          <select
            class="col-start-1 row-start-1 appearance-none bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5 "
            onChange={(e) => navigate(e.target.value)}
            className="text-black px-3 py-2 rounded-lg hover:text-indigo-600"
            defaultValue=""
          >
            <option value="" disabled>
              Lost Item
            </option>
            <option value="/lost-entry">Submit Lost Item</option>
            <option value="/lost-list">Lost Item List</option>
          </select>

          {/* FOUND ITEM DROPDOWN */}
          <select
            class="col-start-1 row-start-1 appearance-none bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5 "
            onChange={(e) => navigate(e.target.value)}
            className="text-black px-3 py-2 rounded-lg hover:text-indigo-600"
            defaultValue=""
          >
            <option value="" disabled>
              Found Item
            </option>
            <option value="/found-entry">Submit Found Item</option>
            <option value="/found-list">Found Item List</option>
          </select>
          <button
            onClick={() => navigate("/chat")}
            className="hover:text-indigo-600"
          >
            Chat
          </button>
          <div className="flex gap-4">
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="border border-black-500 text-black-500 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {/* ---------- PAGE BODY ---------- */}
      <div className="pt-24 p-10 text-center">
        <h2 className="text-4xl pt-24 text-center font-bold text-gray-700">
          Welcome {username}!
        </h2>

        <p className="text-gray-500 mt-4">
          Manage Lost & Found Items, View Personal Details and Chat with other
          Students
        </p>
      </div>
    </div>
  );
};
export default StudentMenu;
