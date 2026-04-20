"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
            knowledgeBase
        });
        
        if(res.status === 200) {
            alert("Settings saved successfully!");
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
      // Fetch existing settings for the owner
      const fetchDetails = async () => {
        try {
          setLoading(true);
          const res = await axios.post("/api/settings/get", { ownerId });
          if (res.status === 200 && res.data) {
            setBusinessName(res.data.businessName);
            setSupportEmail(res.data.supportEmail);
            setKnowledgeBase(res.data.knowledgeBase);
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

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-semibold tracking-normal"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>

          <button 
          className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
          onClick={() => router.push("/embed")}
          >
            Embed Chatbot
          </button>
        </div>
      </motion.div>

      {/* Form */}
      <div className="flex justify-center px-4 py-14 mt-20">
        <motion.div
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Chatbot Settings</h1>
            <p className="text-zinc-500 mt-1">
              Manage your chatbot configuration and preferences.
            </p>
          </div>

          <div className="mb-8">
            <h1 className="text-lg font-medium mb-4">Business Details</h1>
            <div className="space-y-4">
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Business Name"
              />
              <input
                type="text"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder="Support Email"
              />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-lg font-medium mb-4">Knowledge Base</h1>
            <p className="text-sm text-zinc-500 mb-4">Add FAQs, policies, delivery info, refunds, etc.</p>
            <div className="space-y-4">
              <textarea
                value={knowledgeBase}
                onChange={(e) => setKnowledgeBase(e.target.value)}
                className="w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder={`Example:\nRefund Policy: 7 days return available \nDelivery Time: 3-5 business days \nCash on Delivery available\nSupport Hours: 9am - 6pm (Mon-Fri)`}
                rows={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl text-sm bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0 ,y:6}}
                animate={{ opacity: 1,y:0 }}
                className="text-emerald-500 text-sm font-medium"
              >
                Settings saved!
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
