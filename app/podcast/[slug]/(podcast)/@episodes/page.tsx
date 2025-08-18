import Pagination from "@/components/pagination";
import EpisodeCard from "@/components/podcasts/episode-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { ApiResponse } from "@/lib/types/api";
import { Episode } from "@/lib/types/podcast";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

export default async function ({ params,searchParams }: { params: Promise<{ slug: string; }>,searchParams: Promise<{ page: string }> }) {
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

    return (
        <Container>
            <div className="flex flex-col gap-4">
                {episodes.data.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            <Pagination slug={slug} pages={Number(episodes.pagination.pages)} page={Number(episodes.pagination.page)} />
            </div>
        </Container>
    )
}