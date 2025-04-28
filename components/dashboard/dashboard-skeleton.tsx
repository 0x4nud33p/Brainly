import CardSkeleton from "@/components/skeleton/CardSkeleton";
import HeaderSkeleton from "@/components/skeleton/HeaderSkeleton";
import { ReactNode } from "react";

interface DashboardSkeletonProps {
  children?: ReactNode;
}

export default function DashboardSkeleton({ children }: DashboardSkeletonProps) {
  return (
    <div className="w-full">
      <HeaderSkeleton />
      <CardSkeleton />
      {children || "Loading..."}
    </div>
  );
}