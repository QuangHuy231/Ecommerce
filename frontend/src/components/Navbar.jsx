import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useProductStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { getCartCount } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* Right container : Cart , login, search */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          alt="search-icon"
          className="w-5 cursor-pointer"
        />

        {isAuthenticated ? (
          <>
            <div className="group relative">
              <img
                src={assets.profile_icon}
                alt="profile-icon"
                className="w-5 cursor-pointer"
              />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black ">My Profile</p>
                  <p className="cursor-pointer hover:text-black ">Orders</p>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            <Link to={"/cart"} className="relative">
              <img
                src={assets.cart_icon}
                alt="cart-icon"
                className="w-5 min-w-5"
              />
              <span className="absolute -bottom-2 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white">
                {getCartCount()}
              </span>
            </Link>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="border border-black px-6 py-2 rounded-lg text-sm hover:bg-black hover:text-white transition-all duration-500">
              Login
            </button>
          </Link>
        )}

        {/* Mobile menu */}
        <img
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(!visible)}
        />
      </div>

      {/* Sidebar menu for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="back-icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(!visible)}
            to={"/"}
            className="py-2 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            to={"/collection"}
            className="py-2 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            to={"/about"}
            className="py-2 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(!visible)}
            to={"/contact"}
            className="py-2 pl-6 border"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
