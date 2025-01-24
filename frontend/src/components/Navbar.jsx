import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { IoIosSearch } from "react-icons/io";
import { LuUserCircle2 } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbMenuDeep } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch } = useProductStore();
  const { user, logout } = useAuthStore();
  const { getCartCount } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
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
        <Link
          target="_blank"
          to={"https://ecommerce-admin-two-kohl.vercel.app"}
          className="flex flex-col items-center gap-1 border border-gray-600 px-2 rounded-lg bg-gray-300 text-gray-600"
        >
          <p>ADMIN</p>
        </Link>
      </ul>
      {/* Right container : Cart , login, search */}
      <div className="flex items-center gap-6">
        <IoIosSearch
          className="size-6 cursor-pointer"
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
        />

        {user ? (
          <>
            <div className="group relative">
              <LuUserCircle2 className="size-6 cursor-pointer " />

              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p
                    onClick={() => navigate("/user-profile")}
                    className="cursor-pointer hover:text-black "
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black "
                  >
                    Orders
                  </p>
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
              <HiOutlineShoppingBag className="size-6 min-w-6" />
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
        <TbMenuDeep
          className="size-6 cursor-pointer sm:hidden"
          onClick={() => setVisible(!visible)}
        />
      </div>

      {/* Sidebar menu for mobile */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <IoIosArrowBack className="size-4" />
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
          <Link
            target="_blank"
            onClick={() => setVisible(!visible)}
            to={"https://ecommerce-admin-two-kohl.vercel.app"}
            className="py-2 pl-6 border bg-gray-300 text-gray-600"
          >
            ADMIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
