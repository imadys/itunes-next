"use client";
import { Podcast } from "@/lib/types/podcast";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export function PodcastCard({ podcast }: { podcast: Podcast }) {

    return (
        <Card className="p-0 border-none relative overflow-hidden hover:scale-105 transition-all cursor-pointer group">
            <CardContent className="p-0 overflow-hidden">
                <div className="flex flex-col">
                    <Image className="w-full rounded-xl" src={podcast.artworkUrl600} alt={podcast.trackName} width={100} height={100} />
                </div>
                <Link className="absolute inset-0" href={`/podcast/${podcast.id}`}>
                    <span className="sr-only group-hover:block hidden">{podcast.trackName}</span>
                </Link>
            </CardContent>
        </Card>
    )
}