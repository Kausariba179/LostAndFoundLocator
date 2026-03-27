import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
//import '../../DisplayView.css';
import "bootstrap/dist/css/bootstrap.min.css";

const AdminMenu = () => {
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


    <div className="min-h-screen bg-gray-100">
      {/* ---------- NAVBAR ---------- */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-4 flex justify-between items-center z-50 bg-gradient-to-r from-purple-400 to-indigo-500">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-indigo-600">
          Lost & Found Admin
        </h1>

        {/* Menu Items */}
        <div className="flex gap-8 items-center relative">
         

          <button
            onClick={() => navigate("/lost-list")}
            className="hover:text-indigo-600"
          >
            Lost Items
          </button>
          

          <button
            onClick={() => navigate("/found-list")}
            className="hover:text-indigo-600"
          >
            Found Items
          </button>
         

          <button
            onClick={() => navigate("/match-list")}
            className="hover:text-indigo-600"
          >
            Match Items
          </button>
       

           <button
           
            className="hover:text-indigo-600"
          >
            Chat
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="flex gap-4">
           <button
            className="border border-white bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Admin Panel
          </button>
          <button
            onClick={handleLogout}
            className="border border-white text-white px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ---------- PAGE BODY ---------- */}
      <div className="pt-24 p-10 text-center">
        <h2 className="text-4xl pt-24 text-center font-bold text-gray-700">Welcome {username}!</h2>

        <p className="text-gray-500 mt-4">
          Manage Lost & Found Items, Students and Matching System
        </p>
      </div>
    </div>
  );
};
export default AdminMenu;
