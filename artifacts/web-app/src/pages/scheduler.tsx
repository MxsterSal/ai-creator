import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useSchedulePost, useGetScheduledPosts } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

const PLATFORMS = [
  { value: "tiktok",   label: "TikTok",   emoji: "🎵" },
  { value: "youtube",  label: "YouTube",  emoji: "▶️" },
  { value: "twitter",  label: "Twitter",  emoji: "🐦" },
  { value: "linkedin", label: "LinkedIn", emoji: "💼" },
];

const PREMIUM_EMAILS: string[] = [];

export default function Scheduler() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isPremium = PREMIUM_EMAILS.includes(user?.email || "");

  const [platform, setPlatform] = useState("tiktok");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");

  const scheduleMutation = useSchedulePost();
  const { data: posts, isLoading } = useGetScheduledPosts();

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !content) return;
    try {
      await scheduleMutation.mutateAsync({
        data: { userId: user?.email || "anonymous", platform, time, content },
      });
      setContent("");
      setTime("");
      queryClient.invalidateQueries({ queryKey: ["/api/scheduler/all"] });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isPremium) {
    return (
      <DashboardLayout>
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="glow-card" style={{ maxWidth: 420, width: "100%", padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🔒</div>
            <h2 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800 }}>Premium Feature</h2>
            <p style={{ color: "var(--muted-color)", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              The Post Scheduler is available on the Premium plan. Upgrade to schedule posts across TikTok, YouTube, Twitter, and LinkedIn.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/upgrade">
                <button className="btn-gradient" style={{ width: "100%", padding: "14px", fontSize: 16 }}>
                  💎 Upgrade to Premium — $12/mo
                </button>
              </a>
              <a href="/dashboard">
                <button className="btn-secondary" style={{ width: "100%", padding: "12px", fontSize: 14 }}>
                  Back to Dashboard
                </button>
              </a>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <h1>⏱ Scheduler</h1>
            <p>Queue posts for later</p>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: 1300, margin: "28px auto 10px", padding: "0 20px" }}>
          <div className="hero-box">
            <span className="badge">📅 Post across platforms</span>
            <h2 className="gradient-text" style={{ fontSize: 32, lineHeight: 1.1, margin: "12px 0 8px" }}>
              Plan your content calendar.
            </h2>
            <p style={{ color: "var(--muted-color)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Schedule posts to TikTok, YouTube, Twitter and LinkedIn — all from one place.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section style={{ maxWidth: 1300, margin: "24px auto 40px", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {/* New post form */}
          <div className="glow-card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 20 }}>New Post</h2>
            <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 18 }}>Schedule content for later</div>

            <form onSubmit={handleSchedule}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Platform</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, margin: "10px 0 18px" }}>
                {PLATFORMS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPlatform(p.value)}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 12,
                      border: platform === p.value ? "1px solid var(--accent-1)" : "1px solid rgba(255,255,255,0.08)",
                      background: platform === p.value ? "rgba(123,47,247,0.18)" : "rgba(255,255,255,0.05)",
                      color: platform === p.value ? "#c4a0ff" : "var(--muted-color)",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {p.emoji} {p.label}
                  </button>
                ))}
              </div>

              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Date &amp; Time</label>
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                style={{ width: "100%", margin: "10px 0 18px", padding: "14px 15px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,30,0.85)", color: "var(--text)", outline: "none", fontSize: 14 }}
              />

              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Content</label>
              <textarea
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: "100%", margin: "10px 0 18px", padding: "14px 15px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,30,0.85)", color: "var(--text)", minHeight: 120, resize: "vertical", outline: "none", fontSize: 14 }}
              />

              <button
                type="submit"
                className="btn-gradient"
                style={{ width: "100%", padding: 14, fontSize: 15, opacity: scheduleMutation.isPending ? 0.6 : 1 }}
                disabled={scheduleMutation.isPending}
              >
                {scheduleMutation.isPending ? "Scheduling..." : "📅 Schedule Post"}
              </button>
            </form>
          </div>

          {/* Queue */}
          <div className="glow-card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20 }}>Upcoming Queue</h2>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                <div style={{ width: 36, height: 36, border: "4px solid var(--accent-1)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              </div>
            ) : posts && posts.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {posts.map((post, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.04)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 22, lineHeight: 1 }}>
                      {PLATFORMS.find((p) => p.value === post.platform)?.emoji ?? "📢"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>{post.platform}</span>
                        <span style={{ fontSize: 11, color: "var(--muted-color)", background: "rgba(0,0,0,0.3)", padding: "3px 8px", borderRadius: 8 }}>
                          {format(new Date(post.time), "MMM d, h:mm a")}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#e8ecff", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {post.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted-color)" }}>
                <CalendarDays size={44} style={{ margin: "0 auto 12px", opacity: 0.2 }} />
                <p style={{ margin: "0 0 4px", fontWeight: 600 }}>Your queue is empty.</p>
                <p style={{ margin: 0, fontSize: 13 }}>Schedule a post to see it here.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
