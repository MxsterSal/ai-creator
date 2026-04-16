import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Wand2, Video, CalendarDays, Youtube } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const stats = [
    { label: "Plan", value: "Free" },
    { label: "60s Videos Left", value: "10" },
    { label: "Scheduled Posts", value: "0" },
    { label: "Connected Channels", value: "0" },
  ];

  const tools = [
    {
      icon: "✍️",
      lucide: Wand2,
      title: "AI Text Generator",
      sub: "Blogs, social posts, and product descriptions.",
      href: "/generate",
      action: "Generate Text",
    },
    {
      icon: "🎬",
      lucide: Video,
      title: "AI Video Generator",
      sub: "Create short-form videos fast.",
      href: "/video",
      action: "Generate Video",
    },
    {
      icon: "⏱",
      lucide: CalendarDays,
      title: "Scheduler",
      sub: "Queue posts for later.",
      href: "/scheduler",
      action: "Schedule Post",
    },
    {
      icon: "▶️",
      lucide: Youtube,
      title: "YouTube Connect",
      sub: "Connect your YouTube account for uploads.",
      href: "/youtube",
      action: "Connect YouTube",
    },
  ];

  return (
    <DashboardLayout>
      <div className="page-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <h1>AI Creator 🚀</h1>
            <p>Your viral content machine{user?.email ? ` · ${user.email.split("@")[0]}` : ""}</p>
          </div>
          <div className="row">
            <button className="btn-gradient" onClick={() => navigate("/upgrade")}>
              Go Premium 💎
            </button>
            <button className="btn-secondary" onClick={() => navigate("/admin")}>
              Admin
            </button>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: 1300, margin: "28px auto 10px", padding: "0 20px" }}>
          <div className="hero-box">
            <span className="badge">⚡ AI content + video + scheduling</span>
            <h2
              className="gradient-text"
              style={{ fontSize: 36, lineHeight: 1.05, margin: "12px 0 8px" }}
            >
              Build content at startup speed.
            </h2>
            <p className="hero-sub" style={{ color: "var(--muted-color)", maxWidth: 780, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Generate blog posts, product descriptions, social captions, AI videos,
              and schedule them for YouTube and TikTok from one dashboard.
            </p>
          </div>
        </section>

        {/* Stats row */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
            maxWidth: 1300,
            margin: "22px auto 0",
            padding: "0 20px",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{s.value}</div>
            </div>
          ))}
        </section>

        {/* Tool cards */}
        <section
          style={{
            maxWidth: 1300,
            margin: "24px auto 40px",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {tools.map((tool) => (
            <div key={tool.title} className="glow-card" style={{ padding: 22 }}>
              <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 21 }}>
                {tool.icon} {tool.title}
              </h2>
              <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 14 }}>
                {tool.sub}
              </div>
              <Link href={tool.href}>
                <button className="btn-gradient" style={{ width: "100%" }}>
                  {tool.action}
                </button>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </DashboardLayout>
  );
}
