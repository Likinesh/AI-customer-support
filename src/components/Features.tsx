"use client";
import React from "react";
import { motion } from "motion/react";

const ICONS: Record<string, string> = {
  "One-Line Setup": "⚡",
  "Knowledge-Driven Replies": "🧠",
  "Always Available": "🕐",
  // fallback for any other feature names
};

const ACCENT_COLORS: string[] = [
  "rgba(99,102,241,0.12)",   // indigo
  "rgba(16,185,129,0.12)",   // emerald
  "rgba(245,158,11,0.12)",   // amber
];

const ICON_BG: string[] = [
  "rgba(99,102,241,0.18)",
  "rgba(16,185,129,0.18)",
  "rgba(245,158,11,0.18)",
];

const ICON_COLOR: string[] = ["#6366f1", "#10b981", "#f59e0b"];

const Features = ({
  features,
}: {
  features: { name: string; description: string }[];
}) => {
  return (
    <section
      id="feature"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "64px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.12)",
              color: "#6366f1",
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              marginBottom: "16px",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            WHY NEXASSIST
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            Everything you need to support
            <br />
            your customers, effortlessly.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "17px",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            No complex setup. No expensive support teams. Just smart,
            always-on assistance trained on your own content.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.55 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle top accent gradient */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${ICON_COLOR[index % ICON_COLOR.length]}, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: ICON_BG[index % ICON_BG.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "20px",
                  border: `1px solid ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`,
                }}
              >
                {ICONS[feature.name] ?? ["⚡", "🧠", "🕐"][index % 3]}
              </div>

              {/* Feature number badge */}
              <span
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: ICON_COLOR[index % ICON_COLOR.length],
                  opacity: 0.6,
                  letterSpacing: "0.05em",
                }}
              >
                0{index + 1}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                }}
              >
                {feature.name}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
