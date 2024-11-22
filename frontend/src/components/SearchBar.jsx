import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } = useProductStore();
  const [visible, setVisible] = useState(false);
  const localtion = useLocation();

  useEffect(() => {
    if (localtion.pathname.includes("/collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [localtion]);
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <IoIosSearch className="size-4" />
      </div>
      <RxCross1
        onClick={() => setShowSearch(false)}
        className="inline size-4 cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
