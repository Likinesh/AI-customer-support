"use client";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
        padding: "32px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
          NexAssist
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
