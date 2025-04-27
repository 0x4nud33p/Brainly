import CardSkeleton from "@/skeleton/CardSkeleton";
import HeaderSkeleton from "@/skeleton/HeaderSkeleton";
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