import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useProductStore } from "../store/productStore";
import ModalSelectSize from "../components/ModalSelectSize";
import { useModalStore } from "../store/modalStore";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";

const Collection = () => {
  const { search, showSearch } = useProductStore();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [products, setProducts] = useState([]);

  const { isOpen } = useModalStore();

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    productsCopy = productsCopy.filter((item) => item.stock > 0);

    if (showSearch && search) {
      productsCopy = productsCopy?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = (e) => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        setFilterProducts(fpCopy);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        setFilterProducts(fpCopy);
        break;
      default:
        applyFilter();
        break;
    }
  };

  const getAllProducts = async () => {
    const response = await axios.get(
      `https://ecommerce-backend-ten-wheat.vercel.app/api/product`
    );
    setProducts(response.data.products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60 sm:sticky top-10 h-full">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <FaAngleRight
            className={`size-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6  ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Type Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5  ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Collection */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title title1={"ALL"} title2={"COLLECTIONS"} />
          {/* Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isOpen && <ModalSelectSize />}
    </div>
  );
};

export default Collection;
