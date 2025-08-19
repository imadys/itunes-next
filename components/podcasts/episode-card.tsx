import { Episode, Podcast } from "@/lib/types/podcast";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EpisodeCard({ episode, podcast }: { episode: Episode, podcast: Podcast }) {
    return (
        <div className="flex items-center relative gap-4 overflow-hidden border rounded-lg hover:translate-y-[-5px] hover:-translate-x-[-5px] transition-all" key={episode.id}>
            <Image src={episode.image ?? podcast.artworkUrl600} alt={episode.title} width={150} height={150} />
            <div className="flex flex-col gap-2">
                <Link className="before:content-[''] before:absolute before:inset-0 text-lg font-bold hover:underline" href={`/podcast/${podcast.id}/episode/${episode.id}`}>
                    {episode.title}
                </Link>
                <p className="text-sm text-gray-500 truncate max-w-[500px]">{episode.shortDescription ?? episode.description}</p>
                <Button className="w-fit mt-3 relative z-10">
                    <Play className="w-4 h-4" />
                    شاهد الحلقة
                </Button>
            </div>
        </div>
    )
}