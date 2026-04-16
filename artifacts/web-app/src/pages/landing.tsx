import { Link } from "wouter";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    emoji: "✍️",
    title: "AI Content Writer",
    desc: "Generate viral blog posts, tweet threads, and product descriptions tuned for engagement — in seconds.",
  },
  {
    emoji: "🎬",
    title: "AI Video Generator",
    desc: "Turn your ideas into short-form videos ready for TikTok, YouTube Shorts, and Instagram Reels automatically.",
  },
  {
    emoji: "📅",
    title: "Smart Scheduler",
    desc: "Plan your entire content calendar in one place. AI Creator posts to all your linked accounts on autopilot.",
  },
  {
    emoji: "▶️",
    title: "YouTube Connect",
    desc: "Link your YouTube channel and publish videos directly without leaving the dashboard.",
  },
  {
    emoji: "📊",
    title: "Analytics Dashboard",
    desc: "Track views, conversions, and revenue growth. Know exactly what content is working.",
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#070816", color: "#e8ecff", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkles style={{ color: "#7b2ff7", width: 26, height: 26 }} />
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.03em" }}>AI Creator</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/login">
            <button style={{ padding: "9px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "#e8ecff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Log in
            </button>
          </Link>
          <Link href="/signup">
            <button style={{ padding: "9px 18px", borderRadius: 12, border: "none", background: "linear-gradient(90deg,#7b2ff7,#00c6ff)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Get Started →
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "60px 24px 80px", maxWidth: 700, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(123,47,247,0.12)", border: "1px solid rgba(123,47,247,0.3)", fontSize: 13, fontWeight: 600, color: "#c4a0ff", marginBottom: 24 }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7b2ff7", display: "inline-block", animation: "pulse 1.5s infinite" }} />
          AI Creator 2.0 is live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px" }}
        >
          Automate your social{" "}
          <span style={{ background: "linear-gradient(90deg,#7b2ff7,#00c6ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            presence with AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: 17, color: "rgba(232,236,255,0.6)", lineHeight: 1.7, marginBottom: 36 }}
        >
          Generate viral content, create short-form videos, and schedule posts across all platforms — fully on autopilot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/signup">
            <button style={{ padding: "14px 28px", borderRadius: 14, border: "none", background: "linear-gradient(90deg,#7b2ff7,#00c6ff)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Start Free Trial <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/login">
            <button style={{ padding: "14px 28px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#e8ecff", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              Log in
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Feature cards — EasySlice style */}
      <section style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px 80px", display: "flex", flexDirection: "column", gap: 16 }}>
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "32px 28px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 14 }}>{f.emoji}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{f.title}</h3>
            <p style={{ fontSize: 15, color: "rgba(232,236,255,0.55)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
          </motion.div>
        ))}

        {/* CTA at bottom */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link href="/signup">
            <button style={{ padding: "15px 32px", borderRadius: 14, border: "none", background: "linear-gradient(90deg,#7b2ff7,#00c6ff)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", width: "100%" }}>
              💎 Start Free — No Credit Card Needed
            </button>
          </Link>
          <p style={{ color: "rgba(232,236,255,0.35)", fontSize: 13, marginTop: 12 }}>
            Premium plan $12/mo · Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
