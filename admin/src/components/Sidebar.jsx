import React from "react";
import { NavLink } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <CiViewList className="size-8" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to={"/add"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <IoAddCircleOutline className="size-8" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <GiShoppingCart className="size-8" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
