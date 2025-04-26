import CardSkeleton from "@/skeleton/CardSkeleton";
import HeaderSkeleton from "@/skeleton/HeaderSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="w-full">
      <HeaderSkeleton />
      <CardSkeleton />
    </div>
  );
}
