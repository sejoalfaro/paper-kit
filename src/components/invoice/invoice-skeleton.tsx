import { Skeleton } from '@/src/components/ui/skeleton'

export function InvoiceSkeleton() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="max-w-4xl mx-auto rounded-xl shadow-sm border overflow-hidden bg-card">
        {/* Header Section */}
        <div className="p-4 sm:p-6 md:p-10 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full max-w-xs" />
              <Skeleton className="h-4 w-full max-w-xs" />
              <Skeleton className="h-4 w-full max-w-xs" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-3 text-right">
              <Skeleton className="h-6 w-32 ml-auto" />
              <Skeleton className="h-10 w-40 ml-auto" />
              <Skeleton className="h-4 w-36 ml-auto" />
              <Skeleton className="h-4 w-36 ml-auto" />
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="p-4 sm:p-6 md:p-10 border-b">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-md" />
          </div>
        </div>

        {/* Items Table Section */}
        <div className="p-4 sm:p-6 md:p-10">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 pb-2 border-b">
              <Skeleton className="h-4 w-full col-span-5" />
              <Skeleton className="h-4 w-full col-span-2" />
              <Skeleton className="h-4 w-full col-span-2" />
              <Skeleton className="h-4 w-full col-span-2" />
            </div>
            
            {/* Table Rows */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-2 py-2">
                <Skeleton className="h-6 w-full col-span-5" />
                <Skeleton className="h-6 w-full col-span-2" />
                <Skeleton className="h-6 w-full col-span-2" />
                <Skeleton className="h-6 w-full col-span-2" />
              </div>
            ))}
            
            <Skeleton className="h-9 w-32 mt-4" />
          </div>
        </div>

        {/* Summary Section */}
        <div className="p-4 sm:p-6 md:p-10 border-t bg-muted/30">
          <div className="space-y-3 max-w-sm ml-auto">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex justify-between pt-3 border-t">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center border-t">
          <Skeleton className="h-3 w-64 mx-auto" />
        </div>
      </div>
    </div>
  )
}
