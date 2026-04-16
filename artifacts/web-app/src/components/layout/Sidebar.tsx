import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Wand2, 
  Video, 
  CalendarDays, 
  Youtube, 
  BarChart3, 
  Share2, 
  CreditCard,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const ADMIN_EMAIL = "salmannalsaud@icloud.com";

const navigation = [
  { name: "Dashboard",  href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Content", href: "/generate",  icon: Wand2 },
  { name: "AI Video",   href: "/video",     icon: Video },
  { name: "Scheduler",  href: "/scheduler", icon: CalendarDays },
  { name: "YouTube",    href: "/youtube",   icon: Youtube },
  { name: "Social",     href: "/social",    icon: Share2 },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <div className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 bg-card border-r border-border/50">
      <div className="flex items-center h-20 px-8 border-b border-border/50">
        <Sparkles className="w-8 h-8 text-primary mr-3" />
        <span className="font-display font-bold text-xl tracking-tight text-foreground">NexusAI</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Menu</div>
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.name}
              </div>
            </Link>
          );
        })}

        {isAdmin && (
          <Link href="/admin">
            <div className={cn(
              "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group",
              location === "/admin"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}>
              <BarChart3 className={cn(
                "mr-3 h-5 w-5",
                location === "/admin" ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              Admin
            </div>
          </Link>
        )}
      </div>

      <div className="p-4 border-t border-border/50 space-y-2">
        <div className="px-4 py-3 rounded-xl bg-secondary/50 border border-border">
          <div className="text-xs text-muted-foreground">Logged in as</div>
          <div className="text-sm font-medium truncate">{user?.email || "User"}</div>
        </div>
        
        <Link href="/upgrade">
          <div className="flex items-center px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary hover:from-primary/30 hover:to-primary/20 transition-all cursor-pointer border border-primary/20">
            <CreditCard className="mr-3 h-5 w-5" />
            Upgrade Premium
          </div>
        </Link>
        
        <button 
          onClick={logout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all cursor-pointer"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}
