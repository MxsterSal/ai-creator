import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useGenerateContent, GenerateRequestType } from "@workspace/api-client-react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TYPES: { value: GenerateRequestType; label: string; emoji: string }[] = [
  { value: "blog",    label: "Blog",    emoji: "📝" },
  { value: "social",  label: "Social",  emoji: "📣" },
  { value: "product", label: "Product", emoji: "🛍️" },
];

export default function GenerateContent() {
  const [type, setType] = useState<GenerateRequestType>("social");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMutation = useGenerateContent();

  const handleGenerate = async () => {
    if (!prompt) return;
    try {
      const res = await generateMutation.mutateAsync({ data: { type, prompt } });
      setResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="page-wrap">
        {/* Topbar */}
        <div className="topbar">
          <div className="brand">
            <h1>✍️ AI Text Generator</h1>
            <p>Blogs, social posts, and product descriptions</p>
          </div>
        </div>

        {/* Hero */}
        <section style={{ maxWidth: 1300, margin: "28px auto 10px", padding: "0 20px" }}>
          <div className="hero-box">
            <span className="badge">🤖 Powered by GPT-4o-mini</span>
            <h2 className="gradient-text" style={{ fontSize: 32, lineHeight: 1.1, margin: "12px 0 8px" }}>
              Generate copy that converts.
            </h2>
            <p style={{ color: "var(--muted-color)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Pick a content type, enter your prompt, and get high-quality copy in seconds.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section style={{ maxWidth: 1300, margin: "24px auto 40px", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {/* Config card */}
          <div className="glow-card" style={{ padding: 22 }}>
            <h2 style={{ marginTop: 0, marginBottom: 6, fontSize: 20 }}>Configuration</h2>
            <div style={{ color: "var(--muted-color)", fontSize: 13, marginBottom: 18 }}>Tell the AI what you need</div>

            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Content Type</label>
            <div style={{ display: "flex", gap: 8, margin: "10px 0 18px" }}>
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  style={{
                    flex: 1,
                    padding: "10px 6px",
                    borderRadius: 12,
                    border: type === t.value ? "1px solid var(--accent-1)" : "1px solid rgba(255,255,255,0.08)",
                    background: type === t.value ? "rgba(123,47,247,0.18)" : "rgba(255,255,255,0.05)",
                    color: type === t.value ? "#c4a0ff" : "var(--muted-color)",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>

            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--muted-color)" }}>Prompt / Topic</label>
            <textarea
              placeholder="e.g. A post about the benefits of switching to an AI-powered workflow..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: "100%", marginTop: 10, marginBottom: 18, padding: "14px 15px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,13,30,0.85)", color: "var(--text)", minHeight: 160, resize: "vertical", outline: "none", fontSize: 14 }}
            />

            <button
              className="btn-gradient"
              style={{ width: "100%", padding: "14px", fontSize: 15, opacity: !prompt || generateMutation.isPending ? 0.6 : 1 }}
              onClick={handleGenerate}
              disabled={!prompt || generateMutation.isPending}
            >
              {generateMutation.isPending ? "Generating..." : "Generate Content"}
            </button>
          </div>

          {/* Result card */}
          <div className="glow-card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Result</h2>
              {result && (
                <button
                  className="btn-secondary"
                  style={{ padding: "8px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}
                  onClick={copyToClipboard}
                >
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              )}
            </div>

            <div className="output-box" style={{ flex: 1, minHeight: 300, position: "relative", whiteSpace: "pre-wrap", fontSize: 14 }}>
              <AnimatePresence>
                {generateMutation.isPending && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(8,10,24,0.7)", backdropFilter: "blur(4px)", borderRadius: 16, gap: 8 }}
                  >
                    <span style={{ fontSize: 28 }}>✨</span>
                    <p style={{ color: "#c4a0ff", fontWeight: 600, margin: 0, animation: "pulse 1.5s infinite" }}>Drafting...</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {result || (!generateMutation.isPending && "Your generated content will appear here.")}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
