
const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="animate-pulse border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
        >
          <div className="flex">
            <div className="hidden sm:block sm:w-48 h-40 bg-slate-200 dark:bg-slate-800"></div>

            <div className="flex-1 p-4">
              <div className="flex items-center mb-3">
                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 mr-2"></div>
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md mb-4 w-3/4"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-1">
                  <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
                <div className="flex space-x-1">
                  <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton
