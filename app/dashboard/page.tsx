"use client";

import { Suspense } from "react";
import { redirect } from "next/navigation";
import LinkGrid from "@/components/link-grid";
import FolderSidebar from "@/components/folder-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import { authClient } from "@/lib/auth-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { folder?: string; search?: string; tag?: string };
}) {
  const session = authClient.useSession();
  if (!session.data?.session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="container flex-1 items-start gap-6 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
    </div>
  );
}
