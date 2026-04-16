import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link, useLocation } from "wouter";
import { LayoutDashboard, Wand2, Video, CalendarDays, Youtube } from "lucide-react";

const mobileNav = [
  { name: "Home",      href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Text",   href: "/generate",  icon: Wand2 },
  { name: "Video",     href: "/video",     icon: Video },
  { name: "Schedule",  href: "/scheduler", icon: CalendarDays },
  { name: "YouTube",   href: "/youtube",   icon: Youtube },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen relative">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="flex-1 pb-24 lg:pb-6 relative z-10">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f1e] border-t border-white/10 flex items-center justify-around px-1 py-2 safe-area-pb">
        {mobileNav.map((item) => {
          const active = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  padding: "6px 10px",
                  borderRadius: 12,
                  background: active ? "rgba(123,47,247,0.15)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  minWidth: 52,
                }}
              >
                <item.icon
                  size={20}
                  style={{ color: active ? "#c4a0ff" : "rgba(255,255,255,0.4)" }}
                />
                <span style={{ fontSize: 10, color: active ? "#c4a0ff" : "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  {item.name}
                </span>
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
