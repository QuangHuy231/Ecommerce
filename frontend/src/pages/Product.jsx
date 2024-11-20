import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useParams } from "react-router-dom";
import RelatedProduct from "../components/RelatedProduct";
import { useCartStore } from "../store/cartStore";
import { toast } from "react-toastify";
import ModalSelectSize from "../components/ModalSelectSize";
import { useModalStore } from "../store/modalStore";

const Product = () => {
  const { id } = useParams();
  const { detailProduct, getDetailProduct } = useProductStore();
  const { addToCart, isLoading } = useCartStore();
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const { isOpen } = useModalStore();

  const handleAddToCart = async () => {
    if (!size) {
      toast.error("Please select size");
      return;
    }
    addToCart(
      detailProduct._id,
      size,
      image,
      detailProduct.price,
      detailProduct.name
    );
  };

  useEffect(() => {
    getDetailProduct(id);
  }, [id]);

  useEffect(() => {
    setImage(detailProduct.images && detailProduct.images[0]);
  }, [detailProduct]);

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
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
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{detailProduct.name}</h1>
          {/* <div className=" flex items-center gap-1 mt-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHESURBVHgBtVVNTsJQEP6mgmtuIO5cGC0nEE/g74KdeARPIDdQTqBLEwXhBnACiBDjjnIDgiuBvvFRrOnPezhN5EtI6XSmX2b6ffMIGcGXbhmKr0CqTY1BS1pHyAi+OBjpS1H/JvCdXWr1J5I6BxkQdLMiWaKA3MKV1mYiAuuRRaGcEwiRjQhcjt0SqhBCTJQYW4gCX+6XJfXyjpJjCyEcn0h1fOoWsKV6SHe0hEh9AdGvN+xUrs60K4zh6Vd17Czac0HexQFjs5iE38jDJsEhUX52vDEyRh9qdhwTA5/v34KcGv4LzPfUHNws/6ZUF/iCnQeYFSYk0NNhrtLroBuGjPLmyl4R8/ydfnyK7Cwd+J9n1PJicl/ro8imFnLAo+bbrumR80eh6AiQwNoRV1w9PjVCVvBWkZq9cTJs72iuxEdAHH7VFLUTsfwIiIESR8k6omBstt2mvQF/UQKrGsxMZT4v7SSjOWOuaWxpb/S157pGz5G/tEU9GrKMLukf7Q01LUUNGGS9DDur9cWPifyU/8wdQeFHkFreqkaNYR0W0NOHpy/Xen15kfWVsoV9M3zlD5Hzx/T83ocQq42yfQR/2k5uhm9CG7C+Nfr7TwAAAABJRU5ErkJggg=="
              alt=""
              className="w-3 5"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHESURBVHgBtVVNTsJQEP6mgmtuIO5cGC0nEE/g74KdeARPIDdQTqBLEwXhBnACiBDjjnIDgiuBvvFRrOnPezhN5EtI6XSmX2b6ffMIGcGXbhmKr0CqTY1BS1pHyAi+OBjpS1H/JvCdXWr1J5I6BxkQdLMiWaKA3MKV1mYiAuuRRaGcEwiRjQhcjt0SqhBCTJQYW4gCX+6XJfXyjpJjCyEcn0h1fOoWsKV6SHe0hEh9AdGvN+xUrs60K4zh6Vd17Czac0HexQFjs5iE38jDJsEhUX52vDEyRh9qdhwTA5/v34KcGv4LzPfUHNws/6ZUF/iCnQeYFSYk0NNhrtLroBuGjPLmyl4R8/ydfnyK7Cwd+J9n1PJicl/ro8imFnLAo+bbrumR80eh6AiQwNoRV1w9PjVCVvBWkZq9cTJs72iuxEdAHH7VFLUTsfwIiIESR8k6omBstt2mvQF/UQKrGsxMZT4v7SSjOWOuaWxpb/S157pGz5G/tEU9GrKMLukf7Q01LUUNGGS9DDur9cWPifyU/8wdQeFHkFreqkaNYR0W0NOHpy/Xen15kfWVsoV9M3zlD5Hzx/T83ocQq42yfQR/2k5uhm9CG7C+Nfr7TwAAAABJRU5ErkJggg=="
              alt=""
              className="w-3 5"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHESURBVHgBtVVNTsJQEP6mgmtuIO5cGC0nEE/g74KdeARPIDdQTqBLEwXhBnACiBDjjnIDgiuBvvFRrOnPezhN5EtI6XSmX2b6ffMIGcGXbhmKr0CqTY1BS1pHyAi+OBjpS1H/JvCdXWr1J5I6BxkQdLMiWaKA3MKV1mYiAuuRRaGcEwiRjQhcjt0SqhBCTJQYW4gCX+6XJfXyjpJjCyEcn0h1fOoWsKV6SHe0hEh9AdGvN+xUrs60K4zh6Vd17Czac0HexQFjs5iE38jDJsEhUX52vDEyRh9qdhwTA5/v34KcGv4LzPfUHNws/6ZUF/iCnQeYFSYk0NNhrtLroBuGjPLmyl4R8/ydfnyK7Cwd+J9n1PJicl/ro8imFnLAo+bbrumR80eh6AiQwNoRV1w9PjVCVvBWkZq9cTJs72iuxEdAHH7VFLUTsfwIiIESR8k6omBstt2mvQF/UQKrGsxMZT4v7SSjOWOuaWxpb/S157pGz5G/tEU9GrKMLukf7Q01LUUNGGS9DDur9cWPifyU/8wdQeFHkFreqkaNYR0W0NOHpy/Xen15kfWVsoV9M3zlD5Hzx/T83ocQq42yfQR/2k5uhm9CG7C+Nfr7TwAAAABJRU5ErkJggg=="
              alt=""
              className="w-3 5"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHESURBVHgBtVVNTsJQEP6mgmtuIO5cGC0nEE/g74KdeARPIDdQTqBLEwXhBnACiBDjjnIDgiuBvvFRrOnPezhN5EtI6XSmX2b6ffMIGcGXbhmKr0CqTY1BS1pHyAi+OBjpS1H/JvCdXWr1J5I6BxkQdLMiWaKA3MKV1mYiAuuRRaGcEwiRjQhcjt0SqhBCTJQYW4gCX+6XJfXyjpJjCyEcn0h1fOoWsKV6SHe0hEh9AdGvN+xUrs60K4zh6Vd17Czac0HexQFjs5iE38jDJsEhUX52vDEyRh9qdhwTA5/v34KcGv4LzPfUHNws/6ZUF/iCnQeYFSYk0NNhrtLroBuGjPLmyl4R8/ydfnyK7Cwd+J9n1PJicl/ro8imFnLAo+bbrumR80eh6AiQwNoRV1w9PjVCVvBWkZq9cTJs72iuxEdAHH7VFLUTsfwIiIESR8k6omBstt2mvQF/UQKrGsxMZT4v7SSjOWOuaWxpb/S157pGz5G/tEU9GrKMLukf7Q01LUUNGGS9DDur9cWPifyU/8wdQeFHkFreqkaNYR0W0NOHpy/Xen15kfWVsoV9M3zlD5Hzx/T83ocQq42yfQR/2k5uhm9CG7C+Nfr7TwAAAABJRU5ErkJggg=="
              alt=""
              className="w-3 5"
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBtVZLUsJAEO0OaFmuuIHhBIJLyg/ZWIIL8QTGI3gCOQKcQG+gLKwswVLLnXID4AbZiR/S9owEyWQSJxZ5izB00/2mH9M9QcgIevDqYMEZzKiH+81b0ziEjKAnbwQENq98+Hwvo3Pqm8RZkAGyGkkigCUoblRMYzMRScmWgXQChshGBFBXvrtgCGOiqGwhsCTtqySKybbgMpPPiIheb0oQly2ES33pT4U83oveSKaqAGElJcuYn4NEv+g5mebRI8gV5P9IR3JHOfLgnOgLnPzIaCjyR0YQj5dLJmzDykAd3G1eiFVs1s374oo9NvwXQp0CuVhr3oem2PHGvcZASoloPJkVcPy0ukwi86ZFcHWjTJVxJbzRss6V3rCIRleACRIromfPhhmMICs2Axt3jieqObkiQuMrIII3y9WZk4kC8ysgAtLPRC2RlE3MN32mDmBQZdHbej/U6eVuSzUW9bmEbKTuVO2NIZ9KsY733LTQ4md32aSXLqCWYtH3RthzANd/xCdU9FuFDwVsY+2om/QTdBpj/jjn8TVejC+kWFtojzf1+T9ax234sCboHA7BEDJujQ74NaynvoZ9A1WXpcuUkbt/AAAAAElFTkSuQmCC"
              alt=""
              className="w-3 5"
            />
            <p className="pl-2">(122)</p>
          </div> */}
          <p className="mt-5 text-3xl font-medium">${detailProduct.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {detailProduct.description}
          </p>
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
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            {isLoading ? "Adding..." : "ADD TO CART"}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        _id={detailProduct._id}
        category={detailProduct.category}
        subCategory={detailProduct.subCategory}
      />

      {isOpen && <ModalSelectSize />}
    </div>
  );
};

export default Product;
