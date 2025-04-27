"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  name?: string;
  email?: string;
}

interface Session {
  data?: {
    user?: User;
  };
}

export function useAuth(): {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await authClient.getSession();
        if ("data" in result && result.data?.user) {
          setUser(result.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      router.push("/");
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Sign out failed. Please try again.");
    }
  };

  return { user, isLoading, signOut };
}


// Example usage in a component
// export function ProtectedRoute({ children }) {
//   const { user, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/"); // Redirect to login if not authenticated
//     }
//   }, [user, isLoading, router]);

//   if (isLoading || !user) {
//     return <div>Loading...</div>; // Or a loading spinner
//   }

//   return <>{children}</>;
// }

//Example API route.
// export async function getServerSideProps({ req, res }) {
//   const session = await authClient.getSession({ req, res });

//   if (!session || !session.user) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   //Do server side database calls, and other protected calls here.
//   return {
//     props: {
//         user: session.user,
//     },
//   };
// }