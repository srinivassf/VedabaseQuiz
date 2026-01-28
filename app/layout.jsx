import "./globals.css";

export const metadata = {
  title: "Vedabase Quiz",
  description: "Self-study quizzes for Bhagavad Gita and Srimad Bhagavatam",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        {/* Site header */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #eee" }}>
          <a
            href="/"
            style={{ textDecoration: "none", fontWeight: 800, color: "#111" }}
          >
            Vedabase Quiz
          </a>
        </div>

        {/* Page content */}
        {children}

        {/* Minimal footer */}
        <footer
  style={{
    marginTop: 48,
    borderTop: "1px solid #eee",
  }}
>
  <div
    style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: "18px 16px",
      fontSize: 13,
      color: "#666",
      lineHeight: 1.6,
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 25, marginBottom: 8, opacity: 0.6 }}>
  🪷
</div>

    Vedabase Quiz is a sacred, non-commercial self-study project based on
    Srila Prabhupada’s translations and purports as published on Vedabase.io.
  </div>
</footer>

      </body>
    </html>
  );
}
