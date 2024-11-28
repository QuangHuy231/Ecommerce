import React, { useEffect, useState } from "react";
import { useModalStore } from "../store/modalStore";
import { toast } from "react-toastify";
import { useCartStore } from "../store/cartStore";
import axios from "axios";

const ModalSelectSize = () => {
  const { closeModal, _id } = useModalStore();
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState({});

  const { addToCart, isLoading } = useCartStore();

  const handleAddToCart = async () => {
    if (quantity > detailProduct.stock) {
      toast.error("Product out of stock");
      return;
    }
    if (!size) {
      toast.error("Please select size");
      return;
    }
    addToCart(
      detailProduct._id,
      size,
      image,
      detailProduct.price,
      detailProduct.name,
      quantity
    );
    closeModal();
  };

  useEffect(() => {
    setImage(detailProduct.images && detailProduct.images[0]);
  }, [detailProduct]);

  const getDetailProduct = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );
      setDetailProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailProduct(_id);
  }, [_id]);

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-10"></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 justify-center items-center w-full md:inset-0 h-full">
        <div className="relative p-4 w-full max-w-3xl h-auto ">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Add to Cart
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row justify-center">
                <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                  {detailProduct.images &&
                    detailProduct.images.map((image, index) => (
                      <img
                        onClick={() => setImage(image)}
                        key={index}
                        src={image}
                        className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                        alt=""
                      />
                    ))}
                </div>
                <div className="w-full sm:w-[80%] ">
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-semibold">{detailProduct.name}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>

                    <svg
                      className="h-4 w-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  </div>

                  <p className="text-sm font-medium text-gray-900 ">5.0</p>
                  <p className="text-sm font-medium text-gray-500 ">(455)</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between flex-wrap">
                  <div className="flex flex-col gap-4 my-8">
                    <p>Select Size</p>
                    <div className="flex gap-2">
                      {detailProduct.sizes &&
                        detailProduct.sizes.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => setSize(item)}
                            className={`border py-2 px-4 bg-gray-100 ${
                              item === size ? "border-orange-500" : ""
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 my-8">
                    <p>
                      Quantity{" "}
                      <span className="text-gray-500">
                        (Available: {detailProduct.stock})
                      </span>
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          setQuantity((prev) => {
                            if (prev > 1) {
                              return prev - 1;
                            }
                            return 1;
                          })
                        }
                        className={`py-2 px-4 bg-gray-100 `}
                      >
                        -
                      </button>
                      <button className="py-2 px-4 bg-gray-100">
                        {quantity}
                      </button>

                      <button
                        onClick={() =>
                          setQuantity((prev) => {
                            if (prev < detailProduct.stock) {
                              return prev + 1;
                            }
                            return prev;
                          })
                        }
                        className={`py-2 px-4 bg-gray-100 `}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="mt-8 sm:w-4/5" />

                <div className="flex justify-between items-center mt-8">
                  <p className="text-2xl font-semibold">
                    ${detailProduct.price}
                  </p>
                  <button
                    onClick={handleAddToCart}
                    type="button"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-2 py-1 sm:px-5 sm:py-2.5 text-sm font-medium text-white  hover:bg-blue-800"
                  >
                    {isLoading ? "Adding..." : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSelectSize;
