import { PodcastCard } from "@/components/podcasts/podcast-card";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Podcast } from "@/lib/types/podcast";
import { Suspense } from "react";

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

const PodcastsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="w-full h-[230px] bg-gray-200 animate-pulse rounded-lg"></div>
      ))}
    </div>
  );
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-center py-10">
      <div className="text-red-600 mb-4">⚠️ خطأ في تحميل البيانات</div>
      <div className="text-gray-600 text-sm">{message}</div>
    </div>
  );
};

export default async function Home() {
  try {
    let podcasts = await api.get("/podcasts", {
      next: {
        tags: ["podcasts"],
      },
      params: {
        limit: 10,
        keyword: "ثمانية"
      }
    }) as ApiResponse<Podcast[]>;

    if(podcasts.data.length === 0) {
      podcasts = await api.post("/podcasts/search", 
        {
          keyword: "ثمانية"
        }
      ) as ApiResponse<Podcast[]>;
    }

    return (
      <Container>
        <div className="text-2xl font-bold mb-10">تشكيلة ثمانية</div>
        <Suspense fallback={<PodcastsSkeleton />}>
          <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
            {podcasts.data.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </Suspense>
      </Container>
    );
  } catch (error) {
    console.error('Failed to fetch podcasts:', error);
    
    return (
      <Container>
        <div className="text-2xl font-bold mb-10">تشكيلة ثمانية</div>
        <ErrorMessage 
          message="لا يمكن الاتصال بالخادم حالياً. يرجى المحاولة مرة أخرى لاحقاً." 
        />
      </Container>
    );
  }
}
