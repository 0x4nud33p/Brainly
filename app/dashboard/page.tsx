import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LinkGrid from "@/components/link-grid";
import FolderSidebar from "@/components/folder-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { SessionProvider } from "next-auth/react";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { folder?: string; search?: string; tag?: string };
}) {
  const session = await getServerSession(authOptions);

//   if (!session?.user) {
//     redirect("/login");
//   }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <SessionProvider> */}
        <DashboardHeader />
        <div className="container flex-1 items-start gap-6 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] py-4">
          <FolderSidebar />
          <main className="flex w-full flex-col overflow-hidden">
            <Suspense fallback={<DashboardSkeleton />}>
              <LinkGrid
                selectedFolder={searchParams.folder}
                searchQuery={searchParams.search}
                selectedTag={searchParams.tag}
              />
            </Suspense>
          </main>
        </div>
      {/* </SessionProvider> */}
    </div>
  );
}
