import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateCheckout } from "@workspace/api-client-react";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";

export default function Upgrade() {
  const checkoutMutation = useCreateCheckout();

  const handleUpgrade = async () => {
    try {
      const res = await checkoutMutation.mutateAsync();
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-12">
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">Upgrade your workspace</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get unlimited access to AI content generation and advanced video features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="border-border/50 bg-card/20">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">Free Plan</CardTitle>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {["10 AI generated posts/mo", "5 short videos (30s) /mo", "Basic scheduler", "Community support"].map((feature) => (
                  <li key={feature} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-muted-foreground/50" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full" disabled>Current Plan</Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-primary relative overflow-hidden shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                Popular
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl flex items-center text-primary">
                <Zap className="w-5 h-5 mr-2 fill-primary" /> Premium
              </CardTitle>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold text-foreground">
                $12
                <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <ul className="space-y-3">
                {["Unlimited AI text generation", "Unlimited 60s video rendering", "Advanced multi-platform scheduling", "Priority 24/7 support", "Custom branding removal"].map((feature) => (
                  <li key={feature} className="flex items-center text-foreground">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="w-full text-lg shadow-primary/25" 
                onClick={handleUpgrade}
                isLoading={checkoutMutation.isPending}
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
