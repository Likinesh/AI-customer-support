"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Features from "./Features";
import axios from "axios";
import { useRouter } from "next/navigation";

const HomeClient = ({ email }: { email: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    window.location.href = "/api/auth/login";
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  }

  const profile = email ? email[0].toUpperCase() : "";
  const [open, setOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef && !popupRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const features = [
    {
      name: "Easy Integration",
      description:
        "Integrate our AI chatbot into your website with just a few lines of code. No technical expertise required.",
    },
    {
      name: "Admin Controlled",
      description:
        "Have full control over your AI chatbot's behavior and responses with our intuitive admin panel.",
    },
    {
      name: "Always Online",
      description:
        "Our AI chatbot is available 24/7 to assist your customers, ensuring they always get the help they need.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-normal">
            Support <span className="text-zinc-400">AI</span>
          </div>
          {email ? (
            <div className="relative" ref={popupRef}>
              <button
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
                onClick={() => setOpen(!open)}
              >
                {profile}
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                  >
                    <button 
                    className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-200"
                    onClick={navigateToDashboard}
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left block px-4 py-3 text-sm text-red-600 hover:bg-zinc-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading?"Loading...":"Login"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Hero section */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              AI Customer Support
              <br />
              Built for modern websites
            </h1>
            <p className="mt-6 text-lg text-zinc-600 max-w-xl">
              Add a powerful AI Chatbot to your website in minutes. Let your
              customers get instant answers using your own business knowledge.
            </p>
            <div className="flex mt-10 gap-4">
              {email ? (
                <button className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60" onClick={navigateToDashboard}>
                  Go to Dashboard
                </button>
              ) : (
                <button
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                  onClick={handleLogin}
                >
                  Get Started
                </button>
              )}
              <a
                className="px-7 py-3 rounded-xl border border-zinc-500 text-zinc-900 hover:bg-zinc-100 transition"
                href="#feature"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500 mb-5">
                Live Chat Preview
              </div>
              <div className="space-y-3">
                <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                  Do you offer cash on delivery?
                </div>
                <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">
                  Yes, COD is available.
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -right-4 w-14 h-14 rounded-full bg-black text-black flex items-center justify-center shadow-xl"
              >
                🗨️
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <Features features={features} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeClient;
