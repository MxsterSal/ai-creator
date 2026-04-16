import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink } from "lucide-react";

export default function YoutubeConnect() {
  const handleConnect = () => {
    // Navigate directly to the backend route to start OAuth flow
    window.location.href = "/api/youtube/auth";
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 pt-10">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Youtube className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Connect YouTube</h1>
          <p className="text-muted-foreground">
            Link your YouTube channel to publish AI-generated videos directly from the dashboard.
          </p>
        </div>

        <Card className="border-red-500/20 bg-card/40">
          <CardHeader className="text-center pb-2">
            <CardTitle>Authorize Access</CardTitle>
            <CardDescription>
              You will be redirected to Google to grant permissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white shadow-red-500/20 w-full max-w-xs"
              onClick={handleConnect}
            >
              <Youtube className="w-5 h-5 mr-2" />
              Connect Channel
              <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center max-w-sm">
              By connecting, you allow NexusAI to upload videos to your channel on your behalf.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
