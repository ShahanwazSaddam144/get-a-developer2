"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            router.push("/");
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, [router]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-600";
    if (passwordStrength === 1) return "bg-red-600";
    if (passwordStrength === 2) return "bg-orange-600";
    if (passwordStrength === 3) return "bg-yellow-600";
    return "bg-green-600";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isSignup
      ? "http://localhost:5000/api/auth/signin"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup
            ? formData
            : { email: formData.email, password: formData.password }
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message);

        if (!isSignup && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/Developer");
        }
      }
    } catch (err) {
      setMessage("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e1e1e] to-[#161616] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6 font-bold text-white">
            💼
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Get a Developer</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Connect with talented developers and build amazing projects together
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">✨</span>
              <span>Showcase your skills</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">🚀</span>
              <span>Build your portfolio</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-2xl">🤝</span>
              <span>Collaborate with experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-white">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {isSignup 
                  ? "Join our community of developers" 
                  : "Sign in to your account"}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {isSignup && (
                <div>
                  <label className="text-gray-300 text-sm font-semibold mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    onChange={handleChange}
                    required={isSignup}
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition"
                  />
                </div>
              )}

              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>

                {isSignup && formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition ${
                            i < passwordStrength
                              ? getPasswordStrengthColor()
                              : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      Password Strength:{" "}
                      <span
                        className={`font-semibold ${
                          passwordStrength === 1
                            ? "text-red-400"
                            : passwordStrength === 2
                            ? "text-orange-400"
                            : passwordStrength === 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading 
                ? "Please wait..." 
                : isSignup 
                ? "Sign Up" 
                : "Login"}
            </button>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm text-center ${
                  message.toLowerCase().includes("success") ||
                  message.toLowerCase().includes("successfully")
                    ? "bg-green-600/20 text-green-400 border border-green-600/50"
                    : "bg-red-600/20 text-red-400 border border-red-600/50"
                }`}
              >
                {message}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-center text-sm text-gray-400">
                {isSignup ? "Already have an account? " : "New user? "}
                <span
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setMessage("");
                    setPasswordStrength(0);
                  }}
                  className="text-blue-400 cursor-pointer font-semibold hover:text-blue-300 transition"
                >
                  {isSignup ? "Login" : "Sign Up"}
                </span>
              </p>
            </div>
          </form>

          {/* Mobile branding */}
          <div className="lg:hidden text-center mt-8">
            <p className="text-gray-500 text-sm">
              © 2024 Get a Developer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;