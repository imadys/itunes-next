import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { Episode, Podcast } from "@/lib/types/podcast";
import { VideoIcon } from "lucide-react";
import Image from "next/image";
import PlayButton from "@/components/play-button";
import FavoriteButton from "@/components/podcasts/favorite-podcast-button";

export default async function ({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const podcast = await api.get(`/podcasts/${slug}`, {
        next: {
            tags: [`podcasts-${slug}`],
        }
    }) as Podcast;

    const latestEpisode = await api.get(`/episodes/podcast/${slug}/latest`, {
        next: {
            tags: [`podcasts-${slug}-latest-episode`],
        }
    }) as Episode;

    return (
        <div>
            <div className="w-full lg:h-[200px] border-b pb-4">
                <div className="flex lg:flex-row flex-col items-center gap-4">
                    <Image className="lg:w-[200px] w-full" src={podcast.artworkUrl600} alt={podcast.trackName} width={200} height={200} />
                    <div className="p-4 flex flex-col">
                        <h1 className="text-2xl font-bold">{podcast.trackName}</h1>
                        <div className="flex mt-3 gap-2 items-center">
                            <small className="text-sm text-gray-500">{podcast.artistName}</small>
                            <Badge variant="outline">{podcast.primaryGenreName}</Badge>
                            <Badge variant={"outline"}><VideoIcon /> {podcast.trackCount} حلقة</Badge>

                        </div>
                        <div className="flex gap-4 mt-4">
                            <PlayButton episode={latestEpisode}>تشغيل آخر حلقة</PlayButton>
                            <FavoriteButton slug={slug} isFavorite={podcast.isFavorite} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}