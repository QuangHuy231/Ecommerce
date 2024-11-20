import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ setToken }) => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setToken("");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
