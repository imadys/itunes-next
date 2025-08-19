"use client";

import { Button } from "@/components/ui/button";
import { Episode } from "@/lib/types/podcast";

import { useAudio } from "@/providers/audio-provider";
import { Loader2, Pause, Play } from "lucide-react";

export default function PlayButton({
    episode,
    children
}: {
    episode: Episode,
    children?: React.ReactNode
}) {
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
        <Button
            className="w-fit relative z-10"
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
            {isCurrentlyLoading ? 'جاري التحميل...' : isCurrentlyPlaying ? 'إيقاف' : children}
        </Button>
    )
}