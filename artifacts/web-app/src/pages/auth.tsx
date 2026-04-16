import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin, useSignup } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  const [matchLogin] = useRoute("/login");
  const isLogin = matchLogin;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const { login } = useAuth();
  
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    try {
      if (isLogin) {
        // Backend returns GenericResponse according to schema, but real backend sends data.
        // We will mock token for frontend since schema hides it.
        await loginMutation.mutateAsync({ data: { email, password } });
        login(email, "mock_jwt_token_" + Date.now());
      } else {
        await signupMutation.mutateAsync({ data: { email, password } });
        login(email, "mock_jwt_token_" + Date.now());
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || "An error occurred");
    }
  };

  const isPending = loginMutation.isPending || signupMutation.isPending;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/auth-bg.png`} 
          alt="Auth background" 
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">NexusAI</span>
            </div>
          </Link>
        </div>

        <Card className="glass border-white/10 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl">{isLogin ? "Welcome back" : "Create an account"}</CardTitle>
            <CardDescription className="text-base">
              {isLogin 
                ? "Enter your credentials to access your workspace" 
                : "Sign up to start automating your social presence"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  {isLogin && <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>}
                </div>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" isLoading={isPending}>
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link href={isLogin ? "/signup" : "/login"}>
                <span className="text-primary font-medium hover:underline cursor-pointer">
                  {isLogin ? "Sign up" : "Log in"}
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
