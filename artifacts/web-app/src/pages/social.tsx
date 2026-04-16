import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { useSocialConnect } from "@workspace/api-client-react";
import { useState } from "react";

export default function SocialConnect() {
  const connectMutation = useSocialConnect();
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const handleConnect = async (platform: string) => {
    try {
      await connectMutation.mutateAsync();
      setConnected(prev => ({ ...prev, [platform]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const platforms = [
    { id: "twitter", name: "Twitter / X", icon: Twitter, color: "text-blue-400" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-500" },
    { id: "facebook", name: "Facebook Pages", icon: Facebook, color: "text-blue-600" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Social Integrations</h1>
          <p className="text-muted-foreground mt-2">Connect your accounts to enable auto-posting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <Card key={platform.id} className="relative overflow-hidden">
              {connected[platform.id] && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <platform.icon className={`w-8 h-8 ${platform.color}`} />
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <CardDescription>
                  {connected[platform.id] ? "Connected securely" : "Not connected"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Button 
                  variant={connected[platform.id] ? "secondary" : "outline"} 
                  className="w-full"
                  onClick={() => handleConnect(platform.id)}
                  disabled={connected[platform.id] || connectMutation.isPending}
                >
                  {connected[platform.id] ? "Manage Settings" : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-2" /> Connect Account
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
