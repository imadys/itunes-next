"use client";

import { Episode } from "@/lib/types/podcast";
import { useAudio } from "@/providers/audio-provider";
import { Loader2, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import FavoriteEpisodeButton from "./favorite-episode-button";

export default function EpisodeCard({ episode }: { episode: Episode }) {
    const { currentEpisode, isPlaying, isLoading, play, pause, resume } = useAudio();

    const isCurrentEpisode = currentEpisode?.id === episode.id;
    const isCurrentlyPlaying = isCurrentEpisode && isPlaying;
    const isCurrentlyLoading = isCurrentEpisode && isLoading;

    const handlePlayClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isCurrentEpisode) {
            if (isPlaying) {
                pause();
            } else {
                resume();
            }
        } else {
            play(episode);
        }
    };

    return (
        <div className="flex lg:flex-row flex-col items-center relative gap-4 overflow-hidden border rounded-lg hover:translate-y-[-5px] hover:-translate-x-[-5px] transition-all" key={episode.id}>
            <Image className="w-full lg:w-auto" src={episode.image ?? episode.podcast.artworkUrl600} alt={episode.title} width={150} height={150} />
            <div className="flex flex-col gap-2 w-full lg:p-0 p-4">
                <Link className="before:content-[''] before:absolute before:inset-0 text-lg font-bold hover:underline" href={`/podcast/${episode.podcast.id}/episode/${episode.id}`}>
                    {episode.title}
                </Link>
                <p className="text-sm text-gray-500 truncate lg:max-w-[500px] max-w-[200px]">{episode.shortDescription ?? episode.description}</p>
                <Button
                    className="w-fit mt-3 relative z-10"
                    onClick={handlePlayClick}
                    disabled={isCurrentlyLoading}
                >
                    {isCurrentlyLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isCurrentlyPlaying ? (
                        <Pause className="w-4 h-4" />
                    ) : (
                        <Play className="w-4 h-4" />
                    )}
                    {isCurrentlyLoading ? 'جاري التحميل...' : isCurrentlyPlaying ? 'إيقاف' : 'تشغيل الحلقة'}
                </Button>
            </div>
            <FavoriteEpisodeButton className="absolute top-2 left-2 z-[30]" podcastSlug={episode.podcast.id.toString()} slug={episode.id.toString()} isFavorite={episode.isFavorite} />
        </div>
    )
}