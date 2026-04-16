import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useGetAdminStats } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

const ADMIN_EMAIL = "salmannalsaud@icloud.com";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();
  const [, navigate] = useLocation();
  const { user } = useAuth();

  if (user && user.email !== ADMIN_EMAIL) {
    return (
      <DashboardLayout>
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="glow-card" style={{ maxWidth: 400, width: "100%", padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🚫</div>
            <h2 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800 }}>Access Denied</h2>
            <p style={{ color: "var(--muted-color)", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              This page is restricted to the site administrator only.
            </p>
            <a href="/dashboard">
              <button className="btn-secondary" style={{ width: "100%", padding: "12px" }}>← Back to Dashboard</button>
            </a>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    { label: "Users",            id: "users",   value: stats?.users   ?? 0 },
    { label: "Premium Users",    id: "premium", value: stats?.premium ?? 0 },
    { label: "Revenue",          id: "revenue", value: `$${stats?.revenue ?? 0}` },
    { label: "Videos Generated", id: "videos",  value: stats?.videos  ?? 0 },
  ];

  return (
    <DashboardLayout>
      <div className="page-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <h1>Admin Panel 📊</h1>
            <p>Manage growth, usage, and revenue</p>
          </div>
          <div className="row">
            <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
              ← Back
            </button>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: 1300, margin: "28px auto 10px", padding: "0 20px" }}>
          <div className="hero-box">
            <span className="badge">📈 Live metrics</span>
            <h2
              className="gradient-text"
              style={{ fontSize: 36, lineHeight: 1.05, margin: "12px 0 8px" }}
            >
              Your app's command center.
            </h2>
            <p style={{ color: "var(--muted-color)", maxWidth: 780, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Watch user growth, premium conversions, revenue, and content generation in one place.
            </p>
          </div>
        </section>

        {/* Stat cards */}
        <section
          style={{
            maxWidth: 1300,
            margin: "24px auto 40px",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {statCards.map((stat) => (
            <div key={stat.id} className="glow-card" style={{ padding: 22 }}>
              <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 10 }}>
                {stat.label}
              </div>
              {isLoading ? (
                <div
                  style={{
                    height: 40,
                    width: 80,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.08)",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              ) : (
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(90deg, #fff 60%, #8ce8ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}
