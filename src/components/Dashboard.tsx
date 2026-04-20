"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ThemeToggle } from "./ThemeProvider";

const Dashboard = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledgeBase,
      });

      if (res.status === 200) {
        setSaved(true);
        setTimeout(() => setSaved(false), 5000);
      } else {
        alert("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("An error occurred while saving settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownerId) {
      const fetchDetails = async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/settings/get", { ownerId });
          if (res.status === 200 && res.data) {
            setBusinessName(res.data.businessName || "");
            setSupportEmail(res.data.supportEmail || "");
            setKnowledgeBase(res.data.knowledgeBase || "");
          }
        } catch (error) {
          console.error("Error fetching settings:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [ownerId]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid var(--input-border)",
    padding: "12px 16px",
    fontSize: "14px",
    background: "var(--input-bg)",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold tracking-normal cursor-pointer"
            onClick={() => router.push("/")}
          >
            Nex<span style={{ color: "var(--text-muted)" }}>Assist</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
                fontSize: "14px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => router.push("/embed")}
            >
              Install Agent
            </button>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
            borderRadius: "16px",
            padding: "40px",
            width: "100%",
            maxWidth: "768px",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Agent Configuration</h1>
            <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
              Set up your NexAssist agent — train it on your business and it will handle customer queries automatically.
            </p>
          </div>

          {/* Business Details */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Business Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={inputStyle}
                placeholder="Business Name"
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--input-border)")}
              />
              <input
                type="text"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                style={inputStyle}
                placeholder="Support Email"
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--input-border)")}
              />
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Knowledge Base</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Write out your FAQs, product details, return policies, delivery timelines — anything your customers ask about.
            </p>
            <textarea
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder={`Example:\nRefund Policy: 7 days return available\nDelivery Time: 3-5 business days\nCash on Delivery available\nSupport Hours: 9am - 6pm (Mon-Fri)`}
              rows={6}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--input-border)")}
            />
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "14px",
                background: "var(--text-primary)",
                color: "var(--bg)",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                fontWeight: 500,
              }}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Settings"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: "#22c55e", fontSize: "14px", fontWeight: 500 }}
              >
                ✓ Settings saved!
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
