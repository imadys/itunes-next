import Pagination from "@/components/pagination";
import EpisodeCard from "@/components/podcasts/episode-card";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Episode, Podcast } from "@/lib/types/podcast";

export default async function ({ params, searchParams }: { params: Promise<{ slug: string; }>, searchParams: Promise<{ page: string }> }) {
    const { slug } = await params;
    const { page } = await searchParams;
    const pageNumber = parseInt(page ?? 1);

    const episodes = await api.get(`/podcasts/${slug}/episodes`, {
        next: {
            tags: [`podcast-episodes-${slug}`],
        },
        params: {
            page: pageNumber,
            limit: 10,
        }
    }) as ApiResponse<Episode[]>;

    const podcast = await api.get(`/podcasts/${slug}`) as Podcast;


    return (
        <Container>
            <div className="flex flex-col gap-4">
                {episodes.data.map((episode) => (
                    <EpisodeCard key={episode.id} podcast={podcast} episode={episode} />
                ))}
                <Pagination slug={slug} total={Number(episodes.pagination.total)} pages={Number(episodes.pagination.pages)} page={Number(episodes.pagination.page)} />
            </div>
        </Container>
    )
}