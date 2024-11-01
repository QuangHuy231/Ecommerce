import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <div className="text-xl font-medium mb-5">COMPANY</div>
          <ul className="flex flex-col gap-1 text-gray-600">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/collection"}>Collection</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
          </ul>
        </div>

        <div>
          <div className="text-xl font-medium mb-5">GET IN TOUCH</div>
          <ul className="flex flex-col gap-1 text-gray-600">
            <span>+1-000-000-0000</span>
            <span>2x8Qa@example.com</span>
            <span>123 Street, New York, USA</span>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm py-5 font-medium">
          &copy; 2024 Ecommerce, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
