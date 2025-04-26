
const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-md mb-2"></div>
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
      <div className="animate-pulse flex items-center space-x-2">
        <div className="h-10 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-20 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
    </div>
  );
}

export default HeaderSkeleton
