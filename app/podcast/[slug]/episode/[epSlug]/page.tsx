import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { Episode } from "@/lib/types/podcast";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EpisodePage({ params }: { params: Promise<{ epSlug: string }> }) {

    const { epSlug } = await params;
    const episode = await api.get(`/episodes/${epSlug}`) as Episode;
    console.log(episode, "episode");
    if (!episode) {
        return notFound();
    }
    return (
        <div>
            <div className="w-full border-b pb-4">
                <div className="flex items-center gap-4 mb-4">
                    <Image src={episode.image ?? episode.podcast.artworkUrl600} alt={episode.title} width={200} height={200} />
                    <div className="p-4 flex flex-col">
                        <h1 className="text-2xl font-bold mb-2">{episode.title}</h1>
                        <div className="flex items-center gap-2">
                            <small className="text-sm text-gray-500">{episode.artistName}</small>
                            {episode.episodeNumber && <Badge variant="outline">رقم الحلقة {episode.episodeNumber}</Badge>}
                            {episode.pubDate && <Badge variant="outline">تاريخ النشر {new Date(episode.pubDate).toLocaleDateString()}</Badge>}
                        </div>

                        <div className="flex gap-4 mt-4">
                            <Button>
                                <Play className="w-4 h-4" />
                                شاهد الحلقة
                            </Button>
                            <Button asChild variant="outline">
                                <Link href={`/podcast/${episode.podcastId}`}>
                                    العودة للقائمة
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <Container>
                    <div className="text-sm text-gray-500 prose" dangerouslySetInnerHTML={{ __html: episode.description }} />

                </Container>
            </div>
        </div>
    )
}