import { Skeleton } from "@/components/ui/skeleton";

export default function EpisodesLoading() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div 
                    key={index}
                    className="flex items-center gap-4 overflow-hidden border rounded-lg p-4"
                >
                    <Skeleton className="w-[150px] h-[150px] rounded-md flex-shrink-0" />
                    
                    <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full max-w-[500px]" />
                            <Skeleton className="h-4 w-2/3 max-w-[300px]" />
                        </div>
                        
                        <Skeleton className="h-9 w-24 mt-3" />
                    </div>
                </div>
            ))}
        </div>
    )
}