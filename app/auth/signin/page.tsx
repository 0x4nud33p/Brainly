"use client";

import Google from "@/svgs/Google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      toast.success("Signed in with Google successfully!");
    } catch (error) {
      console.error("Google sign in failed:", error);
      toast.error("Google sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="mt-2 text-gray-600">Sign in to access your bookmarks</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-gray-800 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Google />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
