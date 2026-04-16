import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useGenerateVideo } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { PlayCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const LENGTHS = [
  { value: 15, label: "15s", sub: "Quick clip" },
  { value: 30, label: "30s", sub: "Standard short" },
  { value: 60, label: "60s", sub: "Extended short" },
];

export default function VideoGenerator() {
  const { user } = useAuth();
  const [length, setLength] = useState(30);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const videoMutation = useGenerateVideo();

  const handleGenerate = async () => {
    setErrorMsg("");
    setResultUrl(null);
    try {
      const res = await videoMutation.mutateAsync({
        data: { userId: user?.email || "anonymous", length },
      });
      setResultUrl(res.videoUrl);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || "Failed to generate video");
    }
  };

  return (
    <DashboardLayout>
      <div className="page-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <h1>🎬 AI Video Generator</h1>
            <p>Create short-form videos fast</p>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: 1300, margin: "28px auto 10px", padding: "0 20px" }}>
          <div className="hero-box">
            <span className="badge">🎥 Placeholder video engine</span>
            <h2 className="gradient-text" style={{ fontSize: 32, lineHeight: 1.1, margin: "12px 0 8px" }}>
              Videos at the speed of thought.
            </h2>
            <p style={{ color: "var(--muted-color)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Select a duration and generate your video. Free plan includes 10× 60-second videos per month.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section style={{ maxWidth: 1300, margin: "24px auto 40px", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {/* Settings card */}
          <div className="glow-card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 20 }}>Video Settings</h2>
            <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 18 }}>Select video duration</div>

            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Duration</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "10px 0 20px" }}>
              {LENGTHS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value)}
                  style={{
                    padding: "14px 8px",
                    borderRadius: 14,
                    border: length === l.value ? "2px solid var(--accent-1)" : "1px solid rgba(255,255,255,0.08)",
                    background: length === l.value ? "rgba(123,47,247,0.18)" : "rgba(255,255,255,0.05)",
                    color: length === l.value ? "#c4a0ff" : "var(--muted-color)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 800 }}>{l.label}</span>
                  <span style={{ fontSize: 11 }}>{l.sub}</span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-color)", fontSize: 12, marginBottom: 20 }}>
              <AlertCircle size={13} />
              60s videos are limited to 10/month on the free plan.
            </div>

            {errorMsg && (
              <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: 13, marginBottom: 16 }}>
                {errorMsg}
              </div>
            )}

            <button
              className="btn-gradient"
              style={{ width: "100%", padding: 14, fontSize: 15, opacity: videoMutation.isPending ? 0.6 : 1 }}
              onClick={handleGenerate}
              disabled={videoMutation.isPending}
            >
              {videoMutation.isPending ? "Rendering..." : "Generate Video"}
            </button>
          </div>

          {/* Preview card */}
          <div className="glow-card" style={{ padding: 22, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ marginTop: 0, marginBottom: 18, fontSize: 20, alignSelf: "flex-start" }}>Preview</h2>
            <div style={{ width: "100%", maxWidth: 260, aspectRatio: "9/16", background: "rgba(0,0,0,0.4)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {videoMutation.isPending ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#c4a0ff" }}>
                  <div style={{ width: 44, height: 44, border: "4px solid #7b2ff7", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Rendering pixels...</span>
                </div>
              ) : resultUrl ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: "absolute", inset: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(123,47,247,0.4), rgba(0,198,255,0.3))" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <a href={resultUrl} target="_blank" rel="noreferrer">
                      <PlayCircle size={64} style={{ color: "white", opacity: 0.9 }} />
                    </a>
                  </div>
                  <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "8px 10px", fontSize: 11, color: "#e8ecff", textAlign: "center" }}>
                    Video ready — click to open
                  </div>
                </motion.div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--muted-color)" }}>
                  <span style={{ fontSize: 36 }}>🎬</span>
                  <span style={{ fontSize: 13 }}>Video preview</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
