import EpisodeCard from "@/components/podcasts/episode-card";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Episode } from "@/lib/types/podcast";

export default async function () {
    const episodes = await api.get(`/episodes/favorites`, {
        next: {
            tags: ["episodes-favorites"],
        },
    }) as ApiResponse<Episode[]>;


    return (
        <div className="flex flex-col gap-4">
            {episodes.data.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </div>
    )
}