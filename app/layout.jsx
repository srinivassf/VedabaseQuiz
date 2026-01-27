import React from "react";
import "./globals.css";

export const metadata = {
  title: "Vedabase Quiz",
  description: "Quiz library for Bhagavad Gita and Srimad Bhagavatam",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #eee" }}>
          <a href="/" style={{ textDecoration: "none", fontWeight: 800, color: "#111" }}>
            Vedabase Quiz
          </a>
        </div>

        {children}

        <div className="footerWrap">
          <footer className="siteFooter">
            <div className="footerLinks">
              <a href="/about/" style={{ textDecoration: "none" }}>About</a>
              <a href="/sources/" style={{ textDecoration: "none" }}>Sources</a>
            </div>

            <div style={{ opacity: 0.85 }}>
              Sources &amp; attribution: scriptural translations and purports referenced here are sourced exclusively from Vedabase.io and
              published by the Bhaktivedanta Book Trust (BBT), authored by His Divine Grace A. C. Bhaktivedanta Swami Prabhupada.
            </div>
            <div style={{ opacity: 0.75, marginTop: 6 }}>
              Vedabase Quiz is an independent, non-commercial study project and is not affiliated with Vedabase.io or the Bhaktivedanta Book Trust.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
