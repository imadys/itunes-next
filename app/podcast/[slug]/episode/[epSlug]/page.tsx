import EpisodeActions from "@/components/podcasts/episode-actions";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { Episode } from "@/lib/types/podcast";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EpisodePage({ params }: { params: Promise<{ epSlug: string }> }) {

    const { epSlug } = await params;
    const episode = await api.get(`/episodes/${epSlug}` , {
        next: {
            tags: [`episodes-${epSlug}`],
        }
    }) as Episode;
    if (!episode) {
        return notFound();
    }
    return (
        <div>
            <div className="w-full border-b pb-4">
                <div className="flex lg:flex-row flex-col items-center gap-4 mb-4">
                    <Image className="w-full lg:w-[200px]" src={episode.image ?? episode.podcast.artworkUrl600} alt={episode.title} width={200} height={200} />
                    <div className="p-4 flex flex-col">
                        <h1 className="text-2xl font-bold mb-2">{episode.title}</h1>
                        <div className="flex items-center gap-2">
                            <small className="text-sm text-gray-500">{episode.artistName}</small>
                            {episode.episodeNumber && <Badge variant="outline">رقم الحلقة {episode.episodeNumber}</Badge>}
                            {episode.pubDate && <Badge variant="outline">تاريخ النشر {new Date(episode.pubDate).toLocaleDateString()}</Badge>}
                        </div>

                        <EpisodeActions episode={episode} />
                    </div>
                </div>
                <Container>
                    <div className="text-sm text-gray-500 prose" dangerouslySetInnerHTML={{ __html: episode.description }} />

                </Container>
            </div>
        </div>
    )
}