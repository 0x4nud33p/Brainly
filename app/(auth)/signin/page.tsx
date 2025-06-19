"use client";

import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import TopLeft from "@/svgs/Topleft";
import BottomRight from "@/svgs/Bottomright";

export default function SignUpWithGoogle() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      console.log("Login response",res);
    } catch (error) {
      console.error("Google sign up failed:", error);
      toast.error("Google sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center bg-slate-950 items-center min-h-screen w-full overflow-hidden">

      <TopLeft />
      <BottomRight />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="w-full bg-indigo-600 text-white border border-black p-3 rounded-lg flex items-center justify-center hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin mr-2" />
          ) : (
            <Mail size={20} className="mr-2" />
          )}
          Sign In with Google
        </button>
      </motion.div>
    </div>
  );
}
