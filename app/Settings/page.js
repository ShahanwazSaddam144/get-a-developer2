"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const AccountSettings = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState("Available");
  const [modal, setModal] = useState(null);
  const [joinedDate, setJoinedDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Generate Initials (SSB)
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);

          // Extra Info
          setJoinedDate(
            new Date(data.user.createdAt || Date.now()).toDateString()
          );
          setLastLogin(
            new Date(data.user.lastLogin || Date.now()).toLocaleString()
          );

          // Fetch availability
          fetchAvailability(token);
        } else {
          router.push("/Auth");
        }
      } catch (err) {
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailability = async (token) => {
      try {
        const res = await fetch("http://localhost:5000/api/profilestatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.status) {
          setAvailability(data.status.availability);
        } else if (res.status === 404) {
          // Profile status doesn't exist, create it with default "Available"
          await createProfileStatus(token, "Available");
        }
      } catch (err) {
        console.error("Availability fetch error:", err);
      }
    };

    const createProfileStatus = async (token, availabilityStatus) => {
      try {
        const res = await fetch("http://localhost:5000/api/profilestatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ availability: availabilityStatus }),
        });
        const data = await res.json();
        if (data.success && data.status) {
          setAvailability(data.status.availability);
        }
      } catch (err) {
        console.error("Profile status creation error:", err);
      }
    };

    fetchUser();
  }, [router]);

  // Update availability on submit
  const updateAvailability = async (newStatus) => {
    try {
      setAvailability(newStatus); // update UI immediately
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/profilestatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ availability: newStatus }),
      });

      if (res.ok) {
        setNotification({ show: true, message: "Availability updated successfully!", type: "success" });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      } else if (res.status === 404) {
        // Profile status doesn't exist, create it
        const createRes = await fetch("http://localhost:5000/api/profilestatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ availability: newStatus }),
        });

        if (createRes.ok) {
          setNotification({ show: true, message: "Availability created successfully!", type: "success" });
          setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
        } else {
          setNotification({ show: true, message: "Failed to create availability", type: "error" });
          setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
        }
      } else {
        setNotification({ show: true, message: "Failed to update availability", type: "error" });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
      }
    } catch (err) {
      console.error("Availability update error:", err);
      setNotification({ show: true, message: "Error updating availability", type: "error" });
      setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    }
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("token");

    try {
      if (modal === "logout") {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem("token");
        router.push("/Auth");
      }

      if (modal === "delete") {
        await fetch("http://localhost:5000/api/auth/delete", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem("token");
        router.push("/");
      }
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setModal(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white text-lg animate-pulse">
        Loading Account Settings...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
          notification.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="mt-20 text-white px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          {/* LEFT SIDEBAR PROFILE */}
          <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-2xl border border-[#2a2a2a] h-fit hover:shadow-blue-900/20 transition">

            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-bold shadow-xl hover:scale-105 transition">
                {getInitials(user?.name)}
              </div>

              <h2 className="mt-5 text-xl text-center font-semibold">
                {user?.name}
              </h2>

              <p className="text-gray-400 text-sm">
                {user?.email}
              </p>

              {user?.isVerified && (
                <span className="mt-3 text-xs bg-green-600 px-4 py-1 rounded-full animate-pulse">
                  Verified Account
                </span>
              )}
            </div>

            <div className="mt-8 border-t border-[#2a2a2a] pt-6 text-sm text-gray-400 space-y-2">
              <p>Member Status: Active</p>
              <p>Security Level: Standard</p>
              <p>Joined: {joinedDate}</p>
              <p>Last Login: {lastLogin}</p>
            </div>
          </div>

          {/* RIGHT SETTINGS CONTENT */}
          <div className="md:col-span-3 space-y-8">

            {/* Account Info */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-[#2a2a2a]">
              <h3 className="text-xl font-semibold mb-6">
                Account Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#2a2a2a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="font-semibold">{user?.name}</p>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Email Address</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-xl">
                  <p className="text-gray-400 text-sm">Verification Status</p>
                  <p className="font-semibold">
                    {user?.isVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Availability (REPLACED WITH SELECT + FORM) */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-[#2a2a2a]">
              <h3 className="text-xl font-semibold mb-6">
                Availability Status
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  updateAvailability(availability);
                }}
                className="flex gap-4 items-center"
              >
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available for Work</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-xl font-semibold transition"
                >
                  Update
                </button>
              </form>

              <p className="mt-4 text-gray-400">
                Current Status:{" "}
                <span className={availability === "Available" ? "text-green-400" : "text-red-500"}>
                  {availability}
                </span>
              </p>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-red-900">
              <h3 className="text-xl font-semibold text-red-500 mb-6">
                Danger Zone
              </h3>

              <div className="space-y-4 text-gray-400 text-sm mb-6">
                <p>• Logging out will end your current session.</p>
                <p>• Deleting account will permanently remove all profile data.</p>
                <p>• This action cannot be reversed.</p>
                <p>• All projects, messages and settings will be erased.</p>
              </div>

              <div className="flex gap-6">
                <button
                  onClick={() => setModal("logout")}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-3 rounded-xl font-semibold transition hover:scale-105"
                >
                  Logout
                </button>

                <button
                  onClick={() => setModal("delete")}
                  className="flex-1 bg-red-700 hover:bg-red-800 py-3 rounded-xl font-semibold transition hover:scale-105"
                >
                  Delete Account
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                If you are experiencing issues, consider contacting support instead of deleting your account.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">

          <div className="bg-[#1e1e1e] w-full max-w-md rounded-2xl p-8 shadow-2xl border border-[#2a2a2a] animate-[fadeIn_.2s_ease-in]">

            <h2 className="text-xl font-semibold mb-4">
              {modal === "logout" ? "Confirm Logout" : "Delete Account"}
            </h2>

            <p className="text-gray-400 mb-6">
              {modal === "logout"
                ? "Are you sure you want to logout from your account?"
                : "This action is permanent and cannot be undone. This will erase all your data."}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-3 rounded-xl bg-[#2a2a2a] hover:bg-[#333] transition font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  modal === "logout"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-red-700 hover:bg-red-800"
                }`}
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AccountSettings;