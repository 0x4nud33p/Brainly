"use client";

import { useEffect, useState } from "react";
import LinkGrid from "@/components/link-grid";
import FolderSidebar from "@/components/folder-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [folder, setFolder] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    setFolder(searchParams.get("folder") || undefined);
    setSearch(searchParams.get("search") || undefined);
    setTag(searchParams.get("tag") || undefined);
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start gap-6 md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <FolderSidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <DashboardSkeleton>
            <LinkGrid
              selectedFolder={folder}
              searchQuery={search}
              selectedTag={tag}
            />
          </DashboardSkeleton>
        </main>
      </div>
    </div>
  );
}
