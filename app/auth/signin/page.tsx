"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Redirect } from "next";

const SignInPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // Redirect to home page if already logged in
  useEffect(() => {
    if (session) {
      setLoading(false); // User is logged in, so stop loading
      // Redirect to home page or dashboard
      window.location.href = "/dashboard"; // Change this to your desired redirect URL
    } else {
      setLoading(false); // User is not logged in, so display the sign-in button
    }
  }, [session]);

  if (loading) return <div>Loading...</div>;

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user?.name || session.user?.email}</h1>
        <p>Email: {session.user?.email}</p>
        <img
          src={session.user?.image || "/default-avatar.jpg"}
          alt="User Avatar"
        />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Sign In</h1>
      <p>Please sign in to continue</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
};

export default SignInPage;
