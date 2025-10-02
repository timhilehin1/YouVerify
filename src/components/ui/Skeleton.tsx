const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// Overview Card Skeleton
export const OverviewCardSkeleton = () => (
  <div className="flex-1 w-full bg-white rounded-[2.5rem] py-6 px-8 shadow-sm">
    <Skeleton className="h-3 w-24 mb-4" />
    <Skeleton className="h-8 w-32 mb-2" />
    <Skeleton className="h-4 w-20" />
  </div>
);

// Invoice Item Skeleton
export const InvoiceItemSkeleton = () => (
  <div className="flex items-center justify-between p-4  rounded-lg">
    <div className="flex-1">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  </div>
);
