import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    const res = await axios.post(
      `https://ecommerce-backend-ten-wheat.vercel.app/api/auth/admin-login`,
      {
        email,
        password,
      }
    );
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("User:", data);
      setToken(data.token);
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error("Login failed");
      console.error("Error:", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="nguyenquanghuya3kd@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={mutation.isPending}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="123456"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={mutation.isPending}
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            {mutation.isPending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
