"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Bell,
  X,
  Settings,
  Code,
  LifeBuoy,
  User,
  Home,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);

        const firstLogin = localStorage.getItem("firstLogin");

        if (!firstLogin) {
          const welcomeNotification = {
            id: Date.now(),
            message: `Welcome to Get-a-Developer, ${data.user.name}! 🚀`,
          };

          setNotifications([welcomeNotification]);
          localStorage.setItem("firstLogin", "done");
        }
      })
      .catch(() => localStorage.clear())
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 text-white bg-[#121212] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
        <h1
          onClick={() => router.push("/")}
          className="text-[20px] sm:text-[25px] font-bold cursor-pointer"
        >
          Get-a-<span className="text-blue-600">Developer</span>
        </h1>

        <div className="flex items-center gap-6">
          {user && (
            <div className="hidden md:flex items-center gap-5 relative">
              <button
                className="relative hover:text-blue-400 transition"
                onClick={() =>
                  setShowNotificationBox(!showNotificationBox)
                }
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-xs px-1.5 rounded-full">
                  {notifications.length}
                </span>
              </button>

              <div
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
                onClick={() => router.push("/Profile")}
              >
                {initials}
              </div>

              {showNotificationBox && (
                <div className="absolute top-12 right-0 w-[350px] bg-[#1e1e1e] border border-gray-700 rounded-2xl shadow-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-green-400">
                      Notification
                    </h3>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start mb-3"
                      >
                        <p className="text-sm text-gray-300 leading-relaxed pr-2">
                          {item.message}
                        </p>
                        <button
                          onClick={() =>
                            deleteNotification(item.id)
                          }
                          className="text-gray-400 hover:text-red-400 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {!user && (
            <button
              onClick={() => router.push("/Auth")}
              className="border border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Join
            </button>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="hover:text-blue-400 transition"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 w-80 bg-[#121212] border-l border-[#2A2A2A] min-h-screen z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A2A]">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Mobile Notification + Avatar */}
        {user && (
          <div className="md:hidden p-6 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold cursor-pointer"
                onClick={() => router.push("/Profile")}
              >
                {initials}
              </div>

              <button
                className="relative hover:text-blue-400 transition"
                onClick={() =>
                  setShowNotificationBox(!showNotificationBox)
                }
              >
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-xs px-1.5 rounded-full">
                  {notifications.length}
                </span>
              </button>
            </div>

            {showNotificationBox && (
              <div className="bg-[#1e1e1e] border border-gray-700 rounded-2xl shadow-2xl p-4">
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start mb-3"
                    >
                      <p className="text-sm text-gray-300 pr-2">
                        {item.message}
                      </p>
                      <button
                        onClick={() =>
                          deleteNotification(item.id)
                        }
                        className="text-gray-400 hover:text-red-400 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col p-6 gap-6 text-gray-300">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <Home size={18} />
            Home
          </button>

          {user && (
            <button
              onClick={() => router.push("/Profile")}
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <User size={18} />
              Profile
            </button>
          )}

          <button
            onClick={() => router.push("/Developer")}
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <Code size={18} />
            Developers
          </button>

          <button
            onClick={() => router.push("/support")}
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <LifeBuoy size={18} />
            Support
          </button>

          <div className="border-t border-gray-400">
            <button
              onClick={() => router.push("/Settings")}
              className="flex items-center gap-3 hover:text-blue-400 mt-3 transition"
            >
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;