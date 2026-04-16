import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import GenerateContent from "@/pages/generate";
import VideoGenerator from "@/pages/video";
import Scheduler from "@/pages/scheduler";
import Upgrade from "@/pages/upgrade";
import YoutubeConnect from "@/pages/youtube";
import AdminDashboard from "@/pages/admin";
import SocialConnect from "@/pages/social";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      
      {/* Protected App Routes wrapped in DashboardLayout internally */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/generate" component={GenerateContent} />
      <Route path="/video" component={VideoGenerator} />
      <Route path="/scheduler" component={Scheduler} />
      <Route path="/upgrade" component={Upgrade} />
      <Route path="/youtube" component={YoutubeConnect} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/social" component={SocialConnect} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
