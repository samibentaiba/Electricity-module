import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-4 mb-12">
        <Skeleton className="h-12 w-3/4 max-w-lg rounded-xl" />
        <Skeleton className="h-6 w-full max-w-2xl rounded-lg" />
      </div>
      
      <div className="space-y-12">
        <section className="space-y-6">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </section>
      </div>
    </div>
  );
}
