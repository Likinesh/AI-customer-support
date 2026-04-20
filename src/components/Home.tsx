"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Features from "./Features";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ThemeToggle, useTheme } from "./ThemeProvider";

const HomeClient = ({ email }: { email: string }) => {
  const router = useRouter();
  const { theme } = useTheme();
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
  };

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
      name: "One-Line Setup",
      description:
        "Add NexAssist to any website with a single script tag. No frameworks, no backend work — just paste and go.",
    },
    {
      name: "Knowledge-Driven Replies",
      description:
        "Train the assistant with your own FAQs, policies, and product info. It answers only from what you provide — no hallucinations.",
    },
    {
      name: "Always Available",
      description:
        "Your AI agent works around the clock, handling customer queries instantly so your team can focus on what matters.",
    },
  ];

  const isDark = theme === "dark";

  return (
    <div
      style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}
      className="overflow-x-hidden"
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(20px)",
        }}
        className="fixed left-0 top-0 z-50 w-full"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-normal">
            Nex<span style={{ color: "var(--text-muted)" }}>Assist</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {email ? (
              <div className="relative" ref={popupRef}>
                <button
                  style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold hover:scale-105 transition"
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
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                      className="absolute right-0 mt-3 w-44 rounded-xl shadow-xl overflow-hidden"
                    >
                      <button
                        style={{ color: "var(--text-primary)" }}
                        className="w-full text-left px-4 py-3 text-sm hover:opacity-70 transition"
                        onClick={navigateToDashboard}
                      >
                        Dashboard
                      </button>
                      <button
                        className="w-full text-left block px-4 py-3 text-sm text-red-500 hover:opacity-70 transition"
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
                style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                className="px-5 py-2 rounded-full text-sm font-medium transition disabled:opacity-60 flex items-center gap-2"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Started"}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero section */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Your AI support agent,
              <br />
              ready in minutes.
            </h1>
            <p className="mt-6 text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
              NexAssist lets you deploy a fully trained AI assistant on any
              website. Just describe your business — it handles the rest.
            </p>
            <div className="flex mt-10 gap-4">
              {email ? (
                <button
                  style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                  className="px-7 py-3 rounded-xl font-medium transition"
                  onClick={navigateToDashboard}
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                  className="px-7 py-3 rounded-xl font-medium transition"
                  onClick={handleLogin}
                >
                  Start for Free
                </button>
              )}
              <a
                style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
                className="px-7 py-3 rounded-xl transition hover:opacity-70"
                href="#feature"
              >
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Chat preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
              }}
              className="rounded-2xl p-6"
            >
              <div className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
                Live Chat Preview
              </div>
              <div className="space-y-3">
                <div
                  style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                  className="rounded-lg px-4 py-2 text-sm ml-auto w-fit"
                >
                  What are your support hours?
                </div>
                <div
                  style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}
                  className="rounded-lg px-4 py-2 text-sm w-fit"
                >
                  We&apos;re available Mon–Fri, 9 am to 6 pm.
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff" }}
                className="absolute -bottom-6 -right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-xl"
              >
                💬
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Features features={features} />
      <Footer />
    </div>
  );
};

export default HomeClient;
