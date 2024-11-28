import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile } = useAuthStore();

  const [address, setAddress] = useState({ ...user?.address });
  const [formData, setFormData] = useState({ ...user });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Save changes
  const handleSave = async () => {
    await updateUserProfile(
      formData.name,
      formData.email,
      formData.phone,
      address
    );
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setTempProfile({ ...user });
    setIsEditing(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.phone}
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="street"
                  value={address?.street}
                  onChange={handleAddressChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.address?.street}
                </div>
              )}
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={address?.city}
                  onChange={handleAddressChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.address?.city}
                </div>
              )}
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={address?.state}
                  onChange={handleAddressChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.address?.state}
                </div>
              )}
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ZipCode
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="zipCode"
                  value={address?.zipCode}
                  onChange={handleAddressChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.address?.zipCode}
                </div>
              )}
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={address?.country}
                  onChange={handleAddressChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              ) : (
                <div className="text-gray-900 border border-gray-300 rounded-lg w-full p-2.5  dark:text-white">
                  {user?.address?.country}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4 sm:mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-700"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white  bg-blue-600 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-blue-700"
              >
                Update Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
