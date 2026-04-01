import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Crown, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ADMIN_USERNAME = "Princefurniture";
const ADMIN_PASSWORD = "PrinceFurniture@Amt";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(
        "prince_admin_auth",
        btoa(`${username}:${Date.now()}`),
      );
      toast.success("Welcome back, Admin!");
      navigate({ to: "/admin" });
    } else {
      setError("Invalid username or password.");
      toast.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "oklch(0.23 0.055 30)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: "oklch(0.978 0.006 80)",
            boxShadow: "0 8px 40px oklch(0.19 0.045 30 / 0.3)",
          }}
        >
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "oklch(0.30 0.065 30)" }}
            >
              <Crown size={28} style={{ color: "oklch(0.70 0.12 65)" }} />
            </div>
            <h1
              className="font-playfair text-2xl font-semibold"
              style={{ color: "oklch(0.30 0.065 30)" }}
            >
              Prince Furniture
            </h1>
            <p
              className="font-inter text-sm mt-1"
              style={{ color: "oklch(0.44 0.038 35)" }}
            >
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="font-inter text-sm font-medium"
                style={{ color: "oklch(0.30 0.065 30)" }}
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                data-ocid="admin.input"
                style={{
                  borderColor: "oklch(0.87 0.02 65)",
                  backgroundColor: "oklch(0.95 0.018 80)",
                }}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="font-inter text-sm font-medium"
                style={{ color: "oklch(0.30 0.065 30)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  data-ocid="admin.input"
                  style={{
                    borderColor: "oklch(0.87 0.02 65)",
                    backgroundColor: "oklch(0.95 0.018 80)",
                    paddingRight: "2.5rem",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={16}
                      style={{ color: "oklch(0.44 0.038 35)" }}
                    />
                  ) : (
                    <Eye size={16} style={{ color: "oklch(0.44 0.038 35)" }} />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p
                className="font-inter text-sm"
                style={{ color: "oklch(0.577 0.245 27.325)" }}
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full border-0 rounded-full font-inter font-medium"
              data-ocid="admin.submit_button"
              style={{
                backgroundColor: "oklch(0.70 0.12 65)",
                color: "oklch(0.19 0.045 30)",
              }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin mr-2" />
              ) : null}
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
