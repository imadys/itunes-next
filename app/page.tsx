import { PodcastCard } from "@/components/podcasts/podcast-card";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Podcast } from "@/lib/types/podcast";
import { Suspense } from "react";


const PodcastsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="w-full h-[230px] bg-gray-200 animate-pulse rounded-lg"></div>
      ))}
    </div>
  );
};

export default async function Home() {

  const podcasts = await api.get("/podcasts", {
    next: {
      tags: ["podcasts"],
    },
    params: {
      limit: 10,
      keyword: "thmanyah"
    }
  }) as ApiResponse<Podcast[]>;

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
}
