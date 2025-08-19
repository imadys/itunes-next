import { PodcastCard } from "@/components/podcasts/podcast-card";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Podcast } from "@/lib/types/podcast";

export default async function FavoritesPodcastsPage() {

    const podcasts = await api.get("/podcasts/favorites") as ApiResponse<Podcast[]>;

    return (
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
            {podcasts.data.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
        </div>
    )
}