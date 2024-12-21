import React, { useState } from "react";
import {
    EditOutlined,
    DeleteOutlined,
    ShoppingOutlined,
    HeartOutlined,
    LockOutlined,
    BellOutlined,
    ShoppingCartOutlined,
  } from '@ant-design/icons';

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?fit=crop&w=800&q=80");

  const dummyOrders = [
    { id: 1, orderNo: "#12345", date: "2024-01-15", status: "Delivered", amount: "$150" },
    { id: 2, orderNo: "#12346", date: "2024-01-10", status: "In Transit", amount: "$230" },
  ];

  const wishlistItems = [
    { id: 1, name: "Premium Headphones", price: "$199", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fit=crop&w=800&q=80" },
    { id: 2, name: "Smart Watch", price: "$299", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fit=crop&w=800&q=80" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-gray-600">+1 234 567 8900</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
              Personal Information
            </button>
          </nav>
        </div>
        <div className="mt-6">
          <form onSubmit={handleFormSubmit} className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your address"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Order History</h2>
          <div className="mt-4 space-y-4">
            {dummyOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <ShoppingCartOutlined className="text-2xl text-gray-500" />
                  <div>
                    <p className="font-medium">Order {order.orderNo}</p>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                    <p className="text-sm text-gray-500">Amount: {order.amount}</p>
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-900">Track Order</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Wishlist</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                <div className="flex-shrink-0">
                  <img className="h-24 w-24 rounded-lg object-cover" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price}</p>
                  <div className="mt-2 flex space-x-2">
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700">
                      Add to Cart
                    </button>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <DeleteOutlined className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Password & Security</h2>
          <form onSubmit={handlePasswordChange} className="mt-4 max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">Two-Factor Authentication</label>
              <button
                type="button"
                className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200"
                role="switch"
                aria-checked="false"
              >
                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
          <div className="mt-4 space-y-4">
            {[
              { title: "Email Notifications", description: "Receive order updates via email" },
              { title: "SMS Notifications", description: "Receive order updates via SMS" },
              { title: "Marketing Communications", description: "Receive promotional offers" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BellOutlined className="text-2xl text-gray-500" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;