"use client";

import { Episode } from "@/lib/types/podcast";
import Link from "next/link";
import PlayButton from "../play-button";
import { Button } from "../ui/button";

export default function EpisodeActions({ episode }: {
    episode: Episode
}) {

    return (
        <div className="flex gap-4 mt-4">
            <PlayButton episode={episode}>تشغيل الحلقة</PlayButton>
            <Button asChild variant="outline">
                <Link href={`/podcast/${episode.podcastId}`}>
                    العودة للقائمة
                </Link>
            </Button>
        </div>
    )
}