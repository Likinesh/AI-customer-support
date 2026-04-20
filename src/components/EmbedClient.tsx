"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import { ThemeToggle, useTheme } from "./ThemeProvider";

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [copied, setCopied] = React.useState(false);

  const embedCode = `<script 
    src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js" 
    data-owner-id="${ownerId}">
</script>`.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Navbar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div
            className="text-lg font-semibold cursor-pointer"
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
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 py-14">
        <motion.div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
            borderRadius: "16px",
            padding: "40px",
            width: "100%",
            maxWidth: "896px",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Install Your Agent</h1>

          <p className="mt-1 mb-4" style={{ color: "var(--text-secondary)" }}>
            Paste this snippet before the <code style={{ background: "var(--bg-secondary)", padding: "1px 5px", borderRadius: "4px" }}>&lt;/body&gt;</code> tag on any page where you want NexAssist to appear:
          </p>

          <div
            style={{ position: "relative", background: "#1a1a2e", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}
          >
            <pre style={{ overflowX: "auto", color: "#e2e8f0", fontSize: "13px", margin: 0 }}>{embedCode}</pre>
            <button
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "var(--surface)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <ol style={{ color: "var(--text-secondary)", fontSize: "14px", paddingLeft: "20px", marginBottom: "48px" }} className="space-y-2 list-decimal">
            <li>Copy the snippet above.</li>
            <li>Open your website&apos;s HTML and paste it just before <code style={{ background: "var(--bg-secondary)", padding: "1px 5px", borderRadius: "4px" }}>&lt;/body&gt;</code>.</li>
            <li>Save and publish your changes — the agent is live instantly.</li>
          </ol>

          <div>
            <h2 className="text-lg font-medium mb-2">Preview</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
              This is how your NexAssist agent will look on your website.
            </p>

            <div style={{ borderRadius: "12px", border: "1px solid var(--border)", overflow: "hidden" }}>
              {/* Browser chrome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "var(--bg-secondary)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f87171", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                <span style={{ marginLeft: "16px", fontSize: "12px", color: "var(--text-muted)" }}>your-website.com</span>
              </div>

              {/* Page body */}
              <div style={{ position: "relative", height: "280px", padding: "24px", background: "var(--bg)", color: "var(--text-muted)", fontSize: "14px" }}>
                Your website content goes here...

                {/* Widget preview */}
                <div style={{
                  position: "absolute", bottom: "90px", right: "24px",
                  width: "240px", background: "var(--surface)", borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)", border: "1px solid var(--border)", overflow: "hidden"
                }}>
                  <div style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff", fontSize: "12px", padding: "8px 12px", display: "flex", justifyContent: "space-between" }}>
                    <span>Support Agent</span>
                    <span>✕</span>
                  </div>
                  <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", background: "var(--bg-secondary)" }}>
                    <div style={{ background: "var(--border)", color: "var(--text-primary)", fontSize: "12px", padding: "6px 10px", borderRadius: "10px", width: "fit-content" }}>
                      Hi! How can I assist you today?
                    </div>
                    <div style={{ background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff", fontSize: "12px", padding: "6px 10px", borderRadius: "8px", marginLeft: "auto", width: "fit-content" }}>
                      What is your return policy?
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    position: "absolute", bottom: "24px", right: "24px",
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: isDark ? "#fff" : "#000", color: isDark ? "#000" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  💬
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmbedClient;